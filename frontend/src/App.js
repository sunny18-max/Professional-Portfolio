import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/portfolio/Navbar';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';
import GitHubStats from './components/portfolio/GitHubStats';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import OpenSource from './components/portfolio/OpenSource';
import CaseStudies from './components/portfolio/CaseStudies';
import Experience from './components/portfolio/Experience';
import Achievements from './components/portfolio/Achievements';
import Education from './components/portfolio/Education';
import Certifications from './components/portfolio/Certifications';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';
import PreloaderWindows from './components/ui/PreloaderWindows';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    // Initialize GSAP plugins
    const init = async () => {
      try {
        const mod = await import('./lib/gsap');
        mod.initGSAP();
      } catch (err) {
        // ignore
      }
    };
    init();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Fetch GitHub repos once and pass to components
  const [ghRepos, setGhRepos] = useState([])
  useEffect(() => {
    let mounted = true
    fetch('https://api.github.com/users/sunny18-max/repos?per_page=200')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (!mounted) return; setGhRepos(Array.isArray(data) ? data : []) })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // prevent scrolling while preloader / boot screens are visible
    if (loading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [loading]);

  return (
    <div className="App bg-[#0a0a0a] min-h-screen">
      {loading && (
        <PreloaderWindows
          onFinish={() => {
            window.scrollTo({ top: 0, left: 0 });
            setLoading(false);
          }}
        />
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats repos={ghRepos} />
        <OpenSource repos={ghRepos} />
        <CaseStudies />
        <Education />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
