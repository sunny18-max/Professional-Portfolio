import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projectsData } from '../../data/mock'

const CaseStudies = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  const spotlight = projectsData.slice(0, 3)

  return (
    <section id="case-studies" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest mb-2">CASE STUDIES</p>
          <h3 className="text-3xl md:text-4xl text-white font-light">Project Deep Dives</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {spotlight.map((p, i) => (
            <motion.article key={p.id} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 * i }} className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <h4 className="text-lg font-medium text-white mb-2">{p.title}</h4>
              <p className="text-white/60 text-sm line-clamp-3 mb-4">{p.description}</p>
              <div className="text-sm text-white/40">Problem: <span className="text-white/80">{p.problem || 'Built for real-time collaboration and performance'}</span></div>
              <div className="mt-3 text-sm text-white/40">Approach: <span className="text-white/80">{p.approach || 'Full-stack architecture with robust API and CI/CD'}</span></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
