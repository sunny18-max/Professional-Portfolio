import { useEffect, useState } from 'react'

export default function useResume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetch('/resume.json')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!mounted) return
        setResume(data)
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [])

  return { resume, loading }
}
