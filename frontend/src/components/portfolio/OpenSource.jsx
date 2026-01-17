import React from 'react'
import { motion } from 'framer-motion'

export default function OpenSource({ repos = [] }) {
  if (!repos || !repos.length) return null
  return (
    <section id="opensource" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest mb-4">OPEN SOURCE</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Selected Repositories</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.slice(0, 6).map((r) => (
            <motion.a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">{r.name}</h3>
                <span className="text-xs text-white/40">{r.language || '—'}</span>
              </div>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">{r.description}</p>
              <div className="flex items-center justify-between text-sm text-white/40">
                <span>⭐ {r.stargazers_count}</span>
                <span>{r.forks_count} forks</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
