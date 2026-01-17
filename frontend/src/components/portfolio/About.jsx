import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Sparkles, Rocket, Users } from 'lucide-react';
import { aboutData } from '../../data/mock';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const highlightIcons = [Code2, Sparkles, Rocket, Users];

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-emerald-400 text-sm tracking-widest mb-4">ABOUT</p>
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Get to know me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {aboutData.bio.map((paragraph, index) => (
                <p key={index} className="text-white/60 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  className="block text-4xl font-light text-white mb-2"
                >
                  15+
                </motion.span>
                <span className="text-white/40 text-sm">Projects Delivered</span>
              </div>
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="block text-4xl font-light text-white mb-2"
                >
                  8.2
                </motion.span>
                <span className="text-white/40 text-sm">GPA at IIIT</span>
              </div>
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="block text-4xl font-light text-white mb-2"
                >
                  100%
                </motion.span>
                <span className="text-white/40 text-sm">Client Satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {aboutData.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
                    <Icon size={18} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{highlight}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
