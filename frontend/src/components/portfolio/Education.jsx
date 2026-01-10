import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap } from 'lucide-react'
import { experienceData } from '../../data/mock'

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Use mock data for Education (do not read resume.json)
  const items = experienceData.filter(e => e.type === 'education').map((e) => `${e.title} — ${e.organization} (${e.period})`)

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-emerald-400 text-sm tracking-widest mb-2">EDUCATION</p>
          <h3 className="text-2xl md:text-3xl font-light text-white">Educational Background</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((ed, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.06 }} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <GraduationCap size={18} className="text-blue-400" />
                </div>
                <div className="text-sm text-white/60">{ed}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
