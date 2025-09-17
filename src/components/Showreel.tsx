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
  const [mediaConsent, setMediaConsent] = useState<boolean | null>(null)

  // particles bg
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-showreel') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let particles: { x:number;y:number;vx:number;vy:number;size:number }[] = []
    const count = 75
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    const init = () => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
        size: Math.random()*3+1,
      }))
    }
    const loop = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.45)'
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill()
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

  // read consent
  useEffect(() => {
    try {
      const stored = localStorage.getItem('consent-media')
      setMediaConsent(stored === 'true')
    } catch {
      setMediaConsent(false)
    }

    const onCustom = (e: Event) => {
      if ((e as CustomEvent).detail === true) setMediaConsent(true)
      if ((e as CustomEvent).detail === false) setMediaConsent(false)
    }
    const onStorage = () => {
      const stored = localStorage.getItem('consent-media')
      setMediaConsent(stored === 'true')
    }
    window.addEventListener('consent:media', onCustom as EventListener)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('consent:media', onCustom as EventListener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const embedUrl = (id: string, start?: number) => {
    const base = `https://www.youtube.com/embed/${id}`
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

  function allowOnlyMediaHere() {
    try {
      localStorage.setItem('consent-media', 'true')
      localStorage.setItem('consent-dismissed', 'true')
      window.dispatchEvent(new CustomEvent('consent:media', { detail: true }))
    } catch {}
    setMediaConsent(true)
  }

  const onThumbKey = (e: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setCurrentId(id)
    }
  }

  return (
    <section id="media" className="showreel-section">
      <canvas id="bg-particles-showreel" className="bg-canvas" aria-hidden="true" />

      <div className="container">
        <h2 className="section-title">Media</h2>

        <div className="player">
          {mediaConsent ? (
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
            <div className="yt-consent">
              <div className="consent-inner">
                <div className="consent-title">Conținut YouTube blocat</div>
                <p>
                  Pentru a reda clipurile, te rugăm să permiți cookie-urile media.
                  Poți citi <a href="/privacy">Politica de Confidențialitate</a>.
                </p>
                <button className="btn allow" onClick={allowOnlyMediaHere}>
                  Permite YouTube & redă
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="thumb-rail" aria-label="Clipuri disponibile">
          {videos.map((v) => (
            <button
              key={v.id}
              className={`thumb ${currentId === v.id ? 'active' : ''}`}
              onClick={() => setCurrentId(v.id)}
              onKeyDown={(e) => onThumbKey(e, v.id)}
              aria-pressed={currentId === v.id}
              aria-label={`Redă: ${v.title}`}
            >
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
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
          color: #fff;
        }
        .bg-canvas { position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .container { position: relative; z-index: 1; width: 100%; max-width: 1200px; }
        .section-title {
          font-size: 3rem;
          margin: 0.5rem 0 2rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
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
        }
        .player iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }

        /* Consent placeholder */
        .yt-consent {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%);
        }
        .consent-inner {
          text-align: center;
          max-width: 560px;
          padding: 1.2rem 1.4rem;
        }
        .consent-title {
          font-weight: 800;
          font-size: 1.25rem;
          margin-bottom: 0.4rem;
        }
        .consent-inner p { color: #ddd; margin-bottom: 0.9rem; }
        .consent-inner a { color: #f0c040; text-decoration: underline; }
        .btn.allow {
          background: #f0c040; color: #0f0c29;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.7rem 1rem; border-radius: 10px; font-weight: 800; cursor: pointer;
        }
        .btn.allow:hover { background: rgb(252,219,127); }

        .thumb-rail {
          margin-top: 1rem;
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
          padding: 0; text-align: left; cursor: pointer;
          transition: transform .15s ease, border-color .2s ease, background .2s ease;
        }
        .thumb:hover { transform: translateY(-2px); }
        .thumb.active { border-color: #f0c040; box-shadow: 0 8px 24px rgba(0,0,0,0.45); }
        .thumb img { width: 100%; height: 125px; object-fit: cover; display: block; }
        .thumb-title {
          display: block; padding: 0.5rem 0.75rem; font-size: 0.95rem;
          color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .cta-row { margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .btn.primary {
          display: inline-flex; align-items:center; justify-content:center;
          padding: 0.8rem 1.1rem; border-radius: 10px; font-weight: 700; text-decoration:none;
          background: #f0c040; color:#0f0c29; border: 1px solid rgba(255,255,255,0.2);
        }
        .btn.primary:hover { background: rgb(252,219,127); }

        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .thumb img { height: 110px; } }
      `}</style>
    </section>
  )
}
