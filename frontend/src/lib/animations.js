import gsap from 'gsap'

export function revealHorizontal(selector, {distance = 160, duration = 1.1, stagger = 0.08, delay = 0} = {}) {
  return gsap.fromTo(selector, {x: -distance, opacity: 0}, {x: 0, opacity: 1, duration, ease: 'power3.out', stagger, delay})
}

export function revealFromRight(selector, options = {}) {
  return revealHorizontal(selector, {distance: -Math.abs(options.distance || 160), ...options})
}

export function chromaticStagger(selector, {duration = 0.9, stagger = 0.06, delay = 0} = {}) {
  const tl = gsap.timeline({delay})
  tl.fromTo(
    selector,
    {y: 16, opacity: 0, filter: 'hue-rotate(20deg) brightness(0.9)'},
    {y: 0, opacity: 1, duration, stagger, ease: 'power2.out', filter: 'hue-rotate(0deg) brightness(1)'}
  )
  return tl
}

export function horizontalController(el, {onUpdate} = {}) {
  // lightweight horizontal controller: maps pointermove over element to a subtle x offset
  const ctx = gsap.context(() => {
    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40
      gsap.to(el, {x, duration: 0.8, ease: 'power2.out'})
      if (onUpdate) onUpdate(x)
    }
    el.addEventListener('pointermove', handler)
    el.addEventListener('pointerleave', () => gsap.to(el, {x: 0, duration: 0.9, ease: 'power2.out'}))
    return () => {
      el.removeEventListener('pointermove', handler)
    }
  }, el)
  return ctx
}
