Backend services for the portfolio

- FastAPI main server (see `server.py`)

Email microservice (Node + EmailJS proxy)

- Located at `./email-service`
- Install dependencies and run from the backend root via the convenience scripts:
  - `npm run install:email` — installs dependencies inside `email-service`
  - `npm run start:email` — starts the email proxy on port `5001` (check `email-service/index.js`)
- The service can proxy contact requests to EmailJS instead of using SMTP. Configure these env vars in `email-service/.env` when you want the server to send emails via EmailJS:
  - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`
- If the EmailJS env vars are not set the service responds with HTTP 501 so the client can fall back to direct EmailJS client-side sends.

FastAPI server

- Install Python dependencies: `pip install -r requirements.txt`
- Run the server: `uvicorn server:app --reload --port 8000`

Resume extraction helper

- A helper script is included at `backend/scripts/extract_resume.py` which parses `frontend/public/images/My_Resume.pdf` and writes `frontend/public/resume.json` for the frontend to consume.
- To run it locally:
  - Install the PDF dependency: `python -m pip install PyPDF2`
  - Run the script: `python scripts/extract_resume.py`
  - It will create `frontend/public/resume.json` (do not commit this file if it contains PII you want to keep private).


Note: the frontend sends contact form requests to `REACT_APP_EMAIL_SERVICE_URL` (defaults to http://localhost:5001/api/email/send). The backend also exposes `/api/github/pinned` which returns pinned repositories fetched server-side from GitHub (no tokens required).