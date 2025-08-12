// src/components/Services.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'

const services = [
  'Muzică live pentru nunți, botezuri, petreceri private, corporate events',
  'Repertoriu variat si vast ce ne permite sa fim flexibili si să ne adaptam in funcție de invitați',
]

/**
 * Add/replace your images in /public/media/services/
 * You can use .webp/.jpg/.png; mix is fine.
 */
const gallery = [
  'https://res.cloudinary.com/dssmjjqlj/image/upload/v1754845397/trupas_d0or03.jpg',
  'https://res.cloudinary.com/dssmjjqlj/image/upload/v1754851701/WhatsApp_Image_2025-08-03_at_22.11.00_mqjgnw.jpg',
  'https://res.cloudinary.com/dssmjjqlj/image/upload/v1754851702/WhatsApp_Image_2025-08-03_at_22.10.59_1_aymzu2.jpg',
]

export default function Services() {
  // ---- Carousel state ----
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // touch/swipe refs
  const startX = useRef<number | null>(null)
  const deltaX = useRef(0)

  const go = (i: number) => {
    const len = gallery.length
    if (len === 0) return
    setIndex(((i % len) + len) % len) // safe modulo (wrap)
  }
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // autoplay
  useEffect(() => {
    if (paused || gallery.length <= 1) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [index, paused])

  // ---- Particles background ----
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-svc') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    const count = 75

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      }))
    }
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(240,192,64,0.5)'
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      requestAnimationFrame(loop)
    }

    resize()
    init()
    loop()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    deltaX.current = 0
    setPaused(true)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return
    deltaX.current = e.touches[0].clientX - startX.current
  }
  const onTouchEnd = () => {
    if (startX.current != null) {
      if (deltaX.current > 60) prev()
      else if (deltaX.current < -60) next()
    }
    startX.current = null
    deltaX.current = 0
    setPaused(false)
  }

  return (
    <section id="servicii" className="services-section">
      <canvas id="bg-particles-svc" className="bg-canvas" />

      <h2>Ce oferim</h2>

      <div className="services-content">
        {/* Left: bullets */}
        <ul className="services-list">
          {services.map((s, i) => (
            <li key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              {s}
            </li>
          ))}
        </ul>

        {/* Right: carousel */}
        <div
          className="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
        >
          <div
            className="track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {gallery.map((src, i) => (
              <div className="slide" role="group" aria-label={`${i + 1} din ${gallery.length}`} key={src}>
                <img
                  src={src}
                  alt={`TRUPAS – serviciu ${i + 1}`}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2' }}
                />
              </div>
            ))}
          </div>

          {/* arrows */}
          {gallery.length > 1 && (
            <>
              <button className="nav prev" aria-label="Anterior" onClick={prev}>‹</button>
              <button className="nav next" aria-label="Următor" onClick={next}>›</button>
            </>
          )}

          {/* dots */}
          {gallery.length > 1 && (
            <div className="dots" role="tablist">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Afișează imaginea ${i + 1}`}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .services-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 2rem;
          background: #24243e;
          color: #efefef;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .bg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin-bottom: 6rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }

        .services-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          width: 100%;
          max-width: 1200px;
          align-items: center;
        }

        /* bullets */
        .services-list { list-style: none; margin: 0; padding: 0; }
        .services-list li {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(240, 192, 64, 0.6);
          border-radius: 0.75rem;
          padding: 1.5rem 2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.5;
          color: #fff;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
        }

        /* carousel */
        .carousel {
          position: relative;
          width: 100%;
          border-radius: 0.9rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          background: rgba(0,0,0,0.25);
          /* keep a cinematic shape */
          aspect-ratio: 16 / 9;
        }
        .track {
          display: flex;
          height: 100%;
          transition: transform 450ms ease;
          will-change: transform;
        }
        .slide {
          min-width: 100%;
          height: 100%;
          position: relative;
        }
        .slide img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.05) saturate(1.05);
        }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.45);
          color: #fff;
          font-size: 1.6rem;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.2s ease;
        }
        .nav:hover { background: rgba(0,0,0,0.65); }
        .nav.prev { left: 10px; }
        .nav.next { right: 10px; }

        .dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
        }
        .dot.active { background: #f0c040; }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .services-content { grid-template-columns: 1fr; gap: 2rem; }
          .carousel { aspect-ratio: 16 / 9; }
          .services-list li { font-size: 1rem; padding: 1rem 1.25rem; }
        }
      `}</style>
    </section>
  )
}
