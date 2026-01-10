import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../data/mock';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Use the canonical mock data (do not read resume.json for Experience)
  const items = experienceData

  // NOTE: rest of component unchanged
  

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-emerald-400 text-sm tracking-widest mb-4">JOURNEY</p>
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Experience & Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-6 w-3 h-3 rounded-full bg-emerald-400 border-4 border-[#0a0a0a] -translate-x-1/2" 
                  style={{ 
                    left: index % 2 === 0 ? 'calc(100% + 1.5rem)' : '-1.5rem',
                  }} 
                />

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      {item.type === 'work' ? (
                        <Briefcase size={20} className="text-emerald-400" />
                      ) : (
                        <GraduationCap size={20} className="text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-emerald-400 text-sm">{item.period}</span>
                      <h3 className="text-white font-medium text-lg mt-1">{item.title}</h3>
                      <p className="text-white/50 text-sm">{item.organization}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {(item.achievements || []).map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-400/60 shrink-0" />
                        <span className="text-white/50 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
