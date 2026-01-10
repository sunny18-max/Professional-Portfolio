import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/mock';
import { SiJavascript, SiPython, SiTypescript, SiReact, SiTensorflow, SiMongodb, SiPostgresql } from 'react-icons/si';
import { chromaticStagger } from '../../lib/animations';

const TAG_ICON_MAP = {
  JavaScript: SiJavascript,
  Python: SiPython,
  TypeScript: SiTypescript,
  React: SiReact,
  TensorFlow: SiTensorflow,
  MongoDB: SiMongodb,
  Postgres: SiPostgresql,
  PostgreSQL: SiPostgresql,
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Web Apps', value: 'web' },
    { name: 'AI / ML', value: 'ai' }
  ];

  const [remoteProjects, setRemoteProjects] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    import('../../lib/github').then(({ fetchPinned }) => {
      fetchPinned().then((pinned) => {
        if (!mounted) return;
        if (pinned && Array.isArray(pinned) && pinned.length) {
          // Map pinned format to projectsData-like shape
          const remote = pinned.map((p, idx) => ({
            id: 'pinned-' + idx,
            title: p.title || p.url.split('/').pop(),
            category: 'web',
            description: p.description || '',
            image: p.image || '#',
            tags: ['GitHub'],
            github: p.url || '#',
            demo: p.url || '#',
            badge: 'Pinned',
            impact: ''
          }));
          setRemoteProjects(remote);
        }
      });
    })
    return () => { mounted = false };
  }, []);

  const effectiveProjects = remoteProjects ? remoteProjects : projectsData;
  const filteredProjects = filter === 'all'
    ? effectiveProjects
    : effectiveProjects.filter(project => project.category === filter);

  React.useEffect(() => {
    if (!inView) return
    // Apply a chromatic stagger reveal for project cards
    chromaticStagger('.projects-grid .group', { duration: 0.9, stagger: 0.06, delay: 0.1 })
  }, [inView])

  const [layout, setLayout] = React.useState('grid')
  const [active, setActive] = React.useState(null)

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-emerald-400 text-sm tracking-widest mb-4">PORTFOLIO</p>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-2">Featured Projects</h2>
              <p className="text-white/50 text-lg max-w-2xl">A curated selection of projects showcasing my expertise in full-stack development and AI integration.</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={()=>setLayout('grid')} className={`px-3 py-2 rounded-md ${layout==='grid' ? 'bg-white text-black' : 'bg-white/5 text-white/60'}`}>Grid</button>
              <button onClick={()=>setLayout('carousel')} className={`px-3 py-2 rounded-md ${layout==='carousel' ? 'bg-white text-black' : 'bg-white/5 text-white/60'}`}>Carousel</button>
              <button onClick={()=>setLayout('list')} className={`px-3 py-2 rounded-md ${layout==='list' ? 'bg-white text-black' : 'bg-white/5 text-white/60'}`}>List</button>
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-5 py-2 text-sm rounded-full transition-all duration-200 ${
                filter === btn.value
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {btn.name}
            </button>
          ))}
        </motion.div>

        {/* Layout variations */}
        {layout === 'grid' && (
          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.article key={project.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="group">
                  <div onClick={()=>setActive(project)} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs bg-white/10 backdrop-blur-md text-white/90 rounded-full">{project.badge}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                      <p className="text-white/50 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-emerald-400/80 text-sm">{project.impact}</span>
                        <ArrowRight size={16} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {layout === 'carousel' && (
          <div className="carousel-wrapper">
            {/* simple horizontal scroll fallback if embla not present */}
            <div className="flex gap-6 overflow-x-auto py-4">
              {filteredProjects.map(p => (
                <div key={p.id} onClick={()=>setActive(p)} className="min-w-[320px] p-6 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer">
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-white font-medium mb-2">{p.title}</h3>
                  <p className="text-white/50 text-sm line-clamp-3">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {layout === 'list' && (
          <div className="space-y-4">
            {filteredProjects.map(p => (
              <div key={p.id} onClick={()=>setActive(p)} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer flex items-start gap-6">
                <img src={p.image} className="w-36 h-24 object-cover rounded-md" />
                <div>
                  <h3 className="text-white font-medium mb-1">{p.title}</h3>
                  <p className="text-white/50 text-sm line-clamp-2">{p.description}</p>
                  <div className="mt-3 text-sm text-white/40">{p.tags.join(' • ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project modal / inspector */}
        <AnimatePresence>
          {active && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
              <motion.div initial={{ y:20 }} animate={{ y:0 }} exit={{ y:20 }} className="max-w-3xl w-full bg-[#071023] rounded-2xl p-6">
                <div className="flex items-start gap-6">
                  <img src={active.image} className="w-44 h-32 object-cover rounded-md shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white">{active.title}</h3>
                    <p className="text-white/50 mt-2">{active.description}</p>
                    <div className="mt-4 flex gap-3">
                      {active.demo && <a href={active.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-500 text-black rounded-md">Live</a>}
                      {active.github && <a href={active.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-white/10 rounded-md">Code</a>}
                    </div>
                  </div>
                  <button onClick={()=>setActive(null)} className="text-white/60">Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/sunny18-max"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            Explore more on GitHub
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
