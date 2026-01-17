import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { personalInfo } from '../../data/mock';
import { revealHorizontal, horizontalController } from '../../lib/animations';

const Hero = () => {
  const socialIcons = [
    { icon: Github, href: personalInfo.socials.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.socials.twitter, label: 'Twitter' },
    { icon: Instagram, href: personalInfo.socials.instagram, label: 'Instagram' }
  ];

  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = horizontalController(heroRef.current)
    // reveal the hero blocks with a horizontal motion
    revealHorizontal(heroRef.current.querySelectorAll('.hero-reveal'), { distance: 160, duration: 1, stagger: 0.08, delay: 0.1 })
    return () => ctx.revert && ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="min-h-[100svh] sm:min-h-screen flex items-start sm:items-center justify-center relative overflow-x-hidden">      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 -right-1/4 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:py-28 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="max-w-4xl">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-sm md:text-base tracking-wide mb-4 hero-reveal"
            >
              Hello, I am
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-5 sm:mb-6 hero-reveal"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light text-white/70 mb-6 sm:mb-8 hero-reveal"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-white/40 max-w-2xl mb-10 sm:mb-12 leading-relaxed hero-reveal"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-16 hero-reveal"
            >
              <motion.a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-4 sm:gap-6 hero-reveal"
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="hero-photo hero-reveal w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 lg:justify-self-end mt-10 lg:mt-0">
            <div className="photo-frame">
              <picture>
                <source srcSet="/images/profile.jpg" type="image/jpeg" />
                <img src="/images/profile.jpg" alt="Profile" className="rounded-full object-cover w-full h-full" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/images/profile.svg'}} />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
