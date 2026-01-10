import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useResume from '../../hooks/useResume'

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { resume } = useResume()

  const items = resume && resume.certifications && resume.certifications.length ? resume.certifications : []

  if (!items || items.length === 0) return null

  return (
    <section id="certifications" className="py-20 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest mb-2">CERTIFICATIONS</p>
          <h3 className="text-2xl md:text-3xl font-light text-white">Certifications & Badges</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 + i * 0.06 }} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="text-white/60 text-sm">{c}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
