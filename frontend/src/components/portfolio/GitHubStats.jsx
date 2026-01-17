import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import GitHubCalendar from 'react-github-calendar'
import OpenSource from './OpenSource'

const API_BASE = 'https://api.github.com/users/sunny18-max'

export default function GitHubStats({ repos: reposProp }) {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState(reposProp || [])
  const [stats, setStats] = useState({ totalStars: 0, topLanguages: [] })

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        const p = await fetch(API_BASE).then(r => r.json())
        if (!mounted) return
        setProfile(p)

        if (reposProp && reposProp.length) {
          // use passed-in repos
          const localRepos = reposProp
          let totalStars = 0
          const langCount = {}
          localRepos.forEach(r => {
            totalStars += (r.stargazers_count || 0)
            if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
          })
          const topLanguages = Object.entries(langCount).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0])
          setRepos(localRepos)
          setStats({ totalStars, topLanguages })
          return
        }

        // fetch repos to compute stars and languages
        const fetched = await fetch(`${API_BASE}/repos?per_page=200`).then(r => r.json())
        if (!mounted) return
        if (Array.isArray(fetched)) {
          setRepos(fetched)
          let totalStars = 0
          const langCount = {}
          fetched.forEach(r => {
            totalStars += (r.stargazers_count || 0)
            if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
          })
          const topLanguages = Object.entries(langCount).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0])
          setStats({ totalStars, topLanguages })
        }
      } catch (err) {
        // ignore
      }
    }

    fetchData()
    return () => { mounted = false }
  }, [reposProp])

  if (!profile) return null

  const topRepos = [...repos].sort((a,b)=>b.stargazers_count - a.stargazers_count).slice(0,6)

  const barData = {
    labels: topRepos.map(r => r.name),
    datasets: [{ label: 'Stars', data: topRepos.map(r => r.stargazers_count), backgroundColor: 'rgba(99,102,241,0.9)' }]
  }

  const pieData = {
    labels: stats.topLanguages,
    datasets: [{ data: stats.topLanguages.map((_,i)=> (i+1)*10), backgroundColor: ['#60a5fa','#34d399','#f97316','#a78bfa','#fb7185','#facc15'] }]
  }

  return (
    <section id="github" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest mb-4">GITHUB</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Open source activity & stats</h2>
        </motion.div>

        <div className="gh-stats">
          <div className="gh-card">
            <div className="text-sm text-white/40">Profile</div>
            <div className="flex items-center gap-4 mt-2">
              <img src={profile.avatar_url} alt="avatar" className="w-12 h-12 rounded-full" />
              <div>
                <div className="text-lg font-medium text-white">{profile.login}</div>
                <div className="text-sm text-white/40">{profile.bio}</div>
              </div>
            </div>
          </div>

          <div className="gh-card">
            <div className="text-sm text-white/40">Followers</div>
            <div className="text-3xl font-semibold text-white mt-2">{profile.followers}</div>
          </div>

          <div className="gh-card">
            <div className="text-sm text-white/40">Public repos</div>
            <div className="text-3xl font-semibold text-white mt-2">{profile.public_repos}</div>
          </div>

          <div className="gh-card">
            <div className="text-sm text-white/40">Total stars</div>
            <div className="text-3xl font-semibold text-white mt-2">{stats.totalStars}</div>
          </div>

          <div className="gh-card">
            <div className="text-sm text-white/40">Top languages</div>
            <div className="text-lg font-medium text-white mt-2">{stats.topLanguages.join(', ') || '—'}</div>
          </div>

          <div className="gh-card">
            <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400">View profile on GitHub</a>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h4 className="text-sm text-white/40 mb-4">Top repos by stars</h4>
            <Bar data={barData} />
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h4 className="text-sm text-white/40 mb-4">Languages</h4>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Contribution heatmap (uses public scraping, no token needed) */}
        <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
          <h4 className="text-sm text-white/40 mb-4">Contribution calendar</h4>
          <GitHubCalendar username="sunny18-max" />
        </div>
      </div>
    </section>
  )
}
