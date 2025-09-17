// src/components/Showreel.tsx
'use client'

import React, { useEffect, useState } from 'react'

type VideoItem = { id: string; title: string; start?: number }

const videos: VideoItem[] = [
  { id: 'p04RPX4PaoE', title: 'TRUPAS – Colaj Latino' },
  { id: 'XJJZQtKMRqw', title: 'TRUPAS – Colaj Jiene' },
  { id: 'ezcl1eyzloo', title: 'TRUPAS – Colaj Sârbe' },
  { id: '7a5dS73Usas', title: 'TRUPAS – Colaj Balkanic' },
  { id: 'ruydSJO77NE', title: 'TRUPAS – Colaj Disco' },
]

export default function Showreel() {
  const [currentId, setCurrentId] = useState(videos[0].id)
  const [mediaAllowed, setMediaAllowed] = useState(false)

  // Read consent and react to changes from CookieBanner
  useEffect(() => {
    try {
      setMediaAllowed(localStorage.getItem('consent-media') === 'true')
    } catch {}
    const onMedia = (e: Event) => setMediaAllowed(!!(e as CustomEvent).detail)
    window.addEventListener('consent:media', onMedia as EventListener)
    return () => window.removeEventListener('consent:media', onMedia as EventListener)
  }, [])

  // Particles
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-showreel') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const count = 75

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const init = () => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      }))
    }
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.45)'
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      requestAnimationFrame(loop)
    }

    resize(); init(); loop()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const embedUrl = (id: string, start?: number) => {
    const base = `https://www.youtube-nocookie.com/embed/${id}`
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      autoplay: '0',
      mute: '0',
      enablejsapi: '1',
    })
    if (start) params.set('start', String(start))
    return `${base}?${params.toString()}`
  }

  const acceptAndPlay = () => {
    try {
      localStorage.setItem('consent-media', 'true')
      localStorage.setItem('consent-dismissed', 'true')
      window.dispatchEvent(new CustomEvent('consent:media', { detail: true }))
    } catch {}
    setMediaAllowed(true)
  }

  return (
    <section id="media" className="showreel-section">
      <canvas id="bg-particles-showreel" className="bg-canvas" aria-hidden="true" />

      <div className="container">
        <h2 className="section-title">Media</h2>
        <br></br>
        <div className="player">
          {mediaAllowed ? (
            <iframe
              key={currentId}
              src={embedUrl(currentId)}
              title="TRUPAS Showreel"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button className="gate" onClick={acceptAndPlay} aria-label="Acceptă cookie-uri media și redă">
              <img
                src={`https://i.ytimg.com/vi/${currentId}/hqdefault.jpg`}
                alt="Previzualizare video"
                loading="lazy"
              />
              <span className="gate-cta">Acceptă cookie-urile media & redă</span>
            </button>
          )}
        </div>

        <div className="thumb-rail" role="listbox" aria-label="Clipuri video">
          {videos.map(v => (
            <button
              key={v.id}
              className={`thumb ${currentId === v.id ? 'active' : ''}`}
              onClick={() => setCurrentId(v.id)}
              aria-pressed={currentId === v.id}
              aria-label={`Redă: ${v.title}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                loading="lazy"
              />
              <span className="thumb-title">{v.title}</span>
            </button>
          ))}
        </div>

        <div className="cta-row">
          <a
            href="https://www.youtube.com/@TRUPAS-u4q/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Vezi mai multe pe YouTube
          </a>
        </div>
      </div>

      <style jsx>{`
        .showreel-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          background: #24243e;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem;
          scroll-margin-top: 80px;
        }
        .bg-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .container { position: relative; z-index: 1; width: 100%; max-width: 1200px; }

        /* TITLE — centered, small gap, gradient + animation */
        .section-title {
          text-align: center;
          font-size: clamp(2rem, 3.8vw, 3rem);
          margin: 0 0 0.75rem; /* little space under title */
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .player {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(4px);
          margin: 0 auto 1rem;
        }
        .player iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

        .gate {
          position: relative;
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: #000;
          display: block;
        }
        .gate img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.75; filter: blur(1.5px); }
        .gate-cta {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          background: #f0c040; color: #0f0c29; font-weight: 800; padding: .9rem 1.1rem; border-radius: .75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,.4); text-align: center; white-space: nowrap;
        }

        .thumb-rail {
          margin-top: 0.75rem;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(220px, 1fr);
          gap: 0.75rem;
          overflow-x: auto;
          padding: 0.25rem 0.25rem 0.5rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .thumb-rail::-webkit-scrollbar { height: 8px; }
        .thumb-rail::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 8px; }

        .thumb {
          position: relative;
          scroll-snap-align: start;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.25);
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          text-align: left;
          cursor: pointer;
          transition: transform .15s ease, border-color .2s ease, background .2s ease;
        }
        .thumb:hover { transform: translateY(-2px); }
        .thumb.active { border-color: #f0c040; box-shadow: 0 8px 24px rgba(0,0,0,0.45); }
        .thumb img { width: 100%; height: 125px; object-fit: cover; display: block; }
        .thumb-title {
          display: block; padding: 0.5rem 0.75rem; font-size: 0.95rem;
          color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .cta-row { margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.8rem 1.1rem; border-radius: 10px; font-weight: 700; text-decoration: none; transition: transform .15s ease, background .2s ease, border-color .2s ease; }
        .btn.primary { color: #1b1231; background: #f0c040; border: 1px solid rgba(255,255,255,0.2); }
        .btn.primary:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.35); background: rgb(252, 219, 127); }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .thumb img { height: 110px; }
        }
      `}</style>
    </section>
  )
}
