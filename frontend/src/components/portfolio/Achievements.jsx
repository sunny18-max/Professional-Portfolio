import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { achievementsData } from '../../data/mock'

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [resume, setResume] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    fetch('/resume.json')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!mounted) return
        setResume(data)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  const [gitData, setGitData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    fetch('https://api.github.com/users/sunny18-max')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (!mounted) return; setGitData(data) })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  let items = []
  if (resume && resume.achievements && resume.achievements.length) items = resume.achievements
  else if (achievementsData && achievementsData.length) items = achievementsData.map(a => a.description)
  else if (gitData) {
    items = [
      `GitHub: ${gitData.public_repos} public repos`,
      `Followers: ${gitData.followers}`,
      `Profile created: ${new Date(gitData.created_at).getFullYear()}`,
      `${gitData.bio || 'Active open-source contributor'}`
    ]
  } else {
    items = []
  }

  return (
    <section id="achievements" className="py-20 sm:py-28 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-emerald-400 text-sm tracking-widest mb-4">ACHIEVEMENTS</p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Highlights & Achievements</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-white/60 text-sm">{a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
