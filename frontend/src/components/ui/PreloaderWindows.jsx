import React, { useEffect, useState } from 'react'
import './preloader-windows.css'

const BOOT_MESSAGES = [
  'INITIALIZING QUANTUM CORE...',
  'LOADING NEURAL NETWORKS...',
  'ESTABLISHING HYPERSPACE CONNECTION...',
  'CALIBRATING HOLOGRAPHIC INTERFACE...',
  'SYSTEM READY'
]

const PreloaderWindows = ({ onFinish }) => {
  const [greeting, setGreeting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [bootIndex, setBootIndex] = useState(0)

  useEffect(() => {
    // Use same greeting sequence timing as Saathvik project (4s)
    const t = setTimeout(() => {
      setGreeting(false)
      setLoading(true)
    }, 4000)

    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loading) return

    const interval = setInterval(() => {
      setBootIndex(prev => {
        if (prev < BOOT_MESSAGES.length - 1) return prev + 1
        clearInterval(interval)
        // small delay then finish
        setTimeout(() => {
          setLoading(false)
          if (onFinish) onFinish()
        }, 500)
        return prev
      })
    }, 400)

    return () => clearInterval(interval)
  }, [loading, onFinish])

  if (greeting) {
    return (
      <div className="greeting-screen">
        <div className="greeting-content">
          <div className="windows-logo">
            <div className="logo-grid">
              <div className="logo-square square-1" />
              <div className="logo-square square-2" />
              <div className="logo-square square-3" />
              <div className="logo-square square-4" />
            </div>
          </div>
          <h1 className="greeting-title">Hi there</h1>
          <p className="greeting-subtitle">Welcome to Saathvik's Portfolio</p>
          <p className="greeting-description">We're setting up your experience...</p>
          <div className="greeting-progress">
            <div className="progress-bar" />
          </div>
          <div className="greeting-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    const percent = Math.round(((bootIndex + 1) / BOOT_MESSAGES.length) * 100)
    return (
      <div className="boot-screen">
        <div className="boot-container">
          <div className="boot-logo">
            <div className="hexagon"><span className="initial">S</span></div>
          </div>
          <div className="boot-text">
            <div className="boot-line">{BOOT_MESSAGES[bootIndex]}</div>
            <div className="boot-progress">
              <div className="boot-bar" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default PreloaderWindows
