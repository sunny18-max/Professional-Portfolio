from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (optional)
mongo_url = os.environ.get('MONGO_URL')
client = None
db = None
if mongo_url:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get('/github/pinned')
async def get_pinned_repos():
    """Fetch the public GitHub profile and return pinned repositories (title, description, url, image).
    This does a server-side fetch to avoid CORS issues.
    """
    import requests
    from bs4 import BeautifulSoup

    profile_url = 'https://github.com/sunny18-max'
    try:
        resp = requests.get(profile_url, timeout=10)
        resp.raise_for_status()
    except Exception as e:
        return {"error": "failed to fetch profile", "detail": str(e)}

    html = resp.text
    soup = BeautifulSoup(html, 'lxml')

    pinned = []

    # Try common selectors used by GitHub for pinned items
    # Github updates markup occasionally; attempt multiple selectors
    selectors = [
        'ol.pinned-items-list li',
        'div.pinned-item-list-item',
        'li.pinned-item-list-item'
    ]

    for sel in selectors:
        items = soup.select(sel)
        if items:
            for item in items:
                try:
                    a = item.find('a', href=True)
                    if a:
                        href = a['href']
                        # Normalize to full URL
                        if href.startswith('/'):
                            href = 'https://github.com' + href
                        title = a.get_text(strip=True)
                    else:
                        # fallback: look for repo name element
                        repo = item.select_one('span.repo') or item.select_one('p.f4')
                        title = repo.get_text(strip=True) if repo else ''
                        href = ''

                    # Description
                    desc_el = item.select_one('p.pinned-item-desc') or item.select_one('p')
                    desc = desc_el.get_text(strip=True) if desc_el else ''

                    # Use GitHub OpenGraph image endpoint
                    # derive owner/repo from href
                    image = None
                    if href and href.startswith('https://github.com/'):
                        parts = href.rstrip('/').split('/')
                        if len(parts) >= 5:
                            owner = parts[-2]
                            repo_name = parts[-1]
                            image = f'https://opengraph.githubassets.com/1/{owner}/{repo_name}'

                    pinned.append({
                        'title': title,
                        'description': desc,
                        'url': href,
                        'image': image
                    })
                except Exception:
                    continue
            break

    return pinned

@api_router.get('/leetcode/{username}')
async def get_leetcode(username: str):
    """Scrape LeetCode profile page for a user's total solved count. Returns { username, totalSolved } or an error."""
    import requests, re
    url = f'https://leetcode.com/u/{username}/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
    try:
        resp = requests.get(url, timeout=10, headers=headers)
        resp.raise_for_status()
    except Exception as e:
        return {'error': 'fetch_failed', 'detail': str(e)}

    html = resp.text
    m = re.search(r'"totalSolved"\s*:\s*([0-9]+)', html)
    if m:
        return {'username': username, 'totalSolved': int(m.group(1))}

    # fallback: attempt GraphQL query to retrieve AC submission numbers
    try:
        gql = {
            'query': 'query userProfile($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { difficulty count } } } }',
            'variables': {'username': username}
        }
        gl_headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': headers['User-Agent'],
            'Referer': f'https://leetcode.com/u/{username}/',
        }
        glresp = requests.post('https://leetcode.com/graphql', json=gql, timeout=10, headers=gl_headers)
        glresp.raise_for_status()
        js = glresp.json()
        counts = js.get('data', {}).get('matchedUser', {}).get('submitStats', {}).get('acSubmissionNum', [])
        total = 0
        for item in counts:
            if item.get('difficulty') == 'All':
                total = item.get('count', 0)
        if total:
            return {'username': username, 'totalSolved': total}
    except Exception as e:
        return {'error': 'graphql_failed', 'detail': str(e)}

    return {'error': 'not_found'}
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if db is None:
        return {"error": "db_not_configured"}

    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        return {"error": "db_not_configured"}

    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()