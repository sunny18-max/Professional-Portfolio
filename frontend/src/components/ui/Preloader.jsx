import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './preloader.css'

const QUOTES = [
  "“Great software is built twice — once in the mind, once in code.”",
  "“Design is not just what it looks like and feels like. Design is how it works.”",
  "“Ready to build something memorable together?”"
]

const Preloader = ({ onFinish }) => {
  const container = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onFinish })
      tl.to('.preloader-logo', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      tl.to('.preloader-quote', { opacity: 1, y: 0, duration: 0.8, stagger: 0.25 }, '+=0.2')
      tl.to('.preloader-cta', { opacity: 1, scale: 1, duration: 0.6 }, '+=0.2')
      tl.to('.preloader', { opacity: 0, pointerEvents: 'none', duration: 0.6, delay: 0.8 })
    }, container)

    return () => ctx.revert()
  }, [onFinish])

  return (
    <div className="preloader" ref={container}>
      <div className="preloader-inner">
        <h1 className="preloader-logo">Saathvik Kalepu</h1>
        <div className="preloader-quote-list">
          {QUOTES.map((q, i) => (
            <p key={i} className="preloader-quote">{q}</p>
          ))}
        </div>
        <div className="preloader-cta">Loading portfolio...</div>
      </div>
    </div>
  )
}

export default Preloader
