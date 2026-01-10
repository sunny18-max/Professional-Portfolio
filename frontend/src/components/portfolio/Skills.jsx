import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillsData } from '../../data/mock';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiTensorflow, SiMongodb, SiPostgresql, SiGit, SiDocker, SiOpenai, SiOpencv, SiFastapi, SiExpress, SiPytorch } from 'react-icons/si';

const ICON_MAP = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  TensorFlow: SiTensorflow,
  'OpenAI API': SiOpenai,
  OpenAI: SiOpenai,
  NLP: SiPytorch,
  'Computer Vision': SiOpencv,
  FastAPI: SiFastapi,
  Express: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Git: SiGit,
  Docker: SiDocker
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const ICON_COLOR = {
    React: '#61dafb',
    'Next.js': '#000000',
    TypeScript: '#3178c6',
    'Tailwind CSS': '#06b6d4',
    'Node.js': '#68a063',
    Python: '#3776ab',
    TensorFlow: '#ff6f00',
    MongoDB: '#47a248',
    PostgreSQL: '#336791',
    Git: '#f05032',
    Docker: '#2496ed',
    FastAPI: '#009688',
    Express: '#333333',
    OpenAI: '#10a37f'
  }

  const categories = [
    { key: 'frontend', title: 'Frontend', color: 'emerald' },
    { key: 'backend', title: 'Backend', color: 'blue' },
    { key: 'aiml', title: 'AI / ML', color: 'purple' },
    { key: 'tools', title: 'DevOps & Tools', color: 'orange' }
  ];

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
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
          <p className="text-emerald-400 text-sm tracking-widest mb-4">SKILLS</p>
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Tech Stack
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white/90 font-medium text-sm tracking-wide">{category.title}</h3>
                  <div className="text-xs text-white/40">{skillsData[category.key].length} items</div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {skillsData[category.key].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.25 + categoryIndex * 0.1 + index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/skill"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-white/3 to-white/5 text-white/80 group-hover:bg-emerald-500/10 transition-colors">
                        {ICON_MAP[skill.name]
                          ? React.createElement(ICON_MAP[skill.name], { size: 18, style: { color: ICON_COLOR[skill.name] || undefined } })
                          : <div className={`w-2 h-2 rounded-full bg-${category.color}-400/50`} />
                        }
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{skill.name}</span>
                          {skill.level && <span className="text-white/40 text-xs">{skill.level}%</span>}
                        </div>
                        {skill.note && <div className="text-white/30 text-xs mt-1">{skill.note}</div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
