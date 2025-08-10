// src/components/SocialProof.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'

type Testimonial = {
  quote: string
  name: string
  event: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Au ridicat toată sala în picioare. Repertoriu super variat, energie maximă și o colaborare fără stres!',
    name: 'Andreea & Mihai',
    event: 'Nuntă – Brașov',
    avatar: '/media/user.png',
  },
  {
    quote:
      'Profesioniști până la capăt. Au știut să ne citească publicul și au livrat exact vibe-ul pe care îl voiam.',
    name: 'Diana & Vlad',
    event: 'Nuntă – București',
    avatar: '/media/user.png',
  },
  {
    quote:
      'Sunet excelent, instrumentiști de top, soliste superbe. Invitații încă ne întreabă de trupă!',
    name: 'Raluca & Cătălin',
    event: 'Nuntă – Cluj',
    avatar: '/media/user.png',
  },
]

const logos = [
]

export default function SocialProof() {
  // particles bg
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-proof') as HTMLCanvasElement | null
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

  // Testimonials carousel
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const len = testimonials.length
  const go = (i: number) => setIdx(((i % len) + len) % len)
  const next = () => go(idx + 1)
  const prev = () => go(idx - 1)

  useEffect(() => {
    if (paused || len <= 1) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [idx, paused, len])

  // touch swipe
  const startX = useRef<number | null>(null)
  const deltaX = useRef(0)
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

  // Count-up stats
  const Stat: React.FC<{ to: number; suffix?: string; label: string }> = ({ to, suffix = '', label }) => {
    const [n, setN] = useState(0)
    useEffect(() => {
      let raf: number
      const dur = 1200
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur)
        setN(Math.round(p * to))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, [to])

    return (
      <div className="stat">
        <div className="value">
          {n}
          {suffix}
        </div>
        <div className="label">{label}</div>
      </div>
    )
  }

  return (
    <section id="recenzii" className="proof-section">
      <canvas id="bg-particles-proof" className="bg-canvas" />
      <h2>Ce spun mirii și partenerii</h2>

      {/* Stats */}
      <div className="stats">
        <Stat to={300} suffix="+" label="Evenimente" />
        <Stat to={2} suffix="+" label="Ani experiență" />
        <Stat to={30} suffix="%" label="Recomandări" />
      </div>

      {/* Testimonials carousel */}
      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
      >
        <div className="track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {testimonials.map((t, i) => (
            <div className="slide" role="group" aria-label={`${i + 1} din ${len}`} key={i}>
              <div className="card">
                {t.avatar ? (
                  <img className="avatar" src={t.avatar} alt={t.name} />
                ) : (
                  <div className="avatar placeholder" />
                )}
                <p className="quote">“{t.quote}”</p>
                <div className="meta">
                  <strong>{t.name}</strong>
                  <span>• {t.event}</span>
                </div>
                <div className="stars" aria-label="5 stele">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {len > 1 && (
          <>
            <button className="nav prev" aria-label="Anterior" onClick={prev}>
              ‹
            </button>
            <button className="nav next" aria-label="Următor" onClick={next}>
              ›
            </button>
            <div className="dots" role="tablist">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Afișează testimonialul ${i + 1}`}
                  className={`dot ${i === idx ? 'active' : ''}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Logos marquee
      <div className="marquee" aria-label="Parteneri">
        <div className="marquee-track">
          {logos.concat(logos).map((src, i) => (
            <img key={i} src={src} alt="Partener" className="logo" />
          ))}
        </div>
      </div> */}

      <style jsx>{`
        .proof-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 2rem 6rem;
          background: #24243e;
          color: #efefef;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 3rem;
        }
        .bg-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
        h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin-top: 1rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }

        /* Stats */
        .stats {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(140px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 900px;
        }
        .stat {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(240, 192, 64, 0.6);
          border-radius: 0.9rem;
          padding: 1.25rem 1rem;
        }
        .value {
          font-size: 2rem;
          font-weight: 800;
          color: #64fff9;
          text-shadow: 0 0 16px rgba(100, 255, 249, 0.2);
        }
        .label { opacity: 0.9; }

        /* Carousel */
        .carousel {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 960px;
          border-radius: 1rem;
          overflow: hidden;
        }
        .track {
          display: flex;
          transition: transform 450ms ease;
        }
        .slide { min-width: 100%; padding: 0.5rem; }
        .card {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 2rem 2rem 2.25rem;
          max-width: 960px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(240, 192, 64, 0.8);
          margin: 0 auto 1rem;
          display: block;
        }
        .avatar.placeholder { background: rgba(255, 255, 255, 0.1); }
        .quote {
          font-size: 1.15rem;
          line-height: 1.65;
          margin: 0 auto 1rem;
          max-width: 800px;
          color: #fff;
        }
        .meta { opacity: 0.9; margin-bottom: 0.5rem; }
        .stars { color: #f0c040; letter-spacing: 2px; font-size: 1.2rem; }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px; height: 42px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 1.6rem;
          cursor: pointer;
          display: grid; place-items: center;
        }
        .nav.prev { left: 10px; }
        .nav.next { right: 10px; }
        .dots {
          position: absolute; bottom: 10px; left: 50%;
          transform: translateX(-50%);
          display: flex; gap: 8px;
        }
        .dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none; cursor: pointer;
        }
        .dot.active { background: #f0c040; }

        /* Logos marquee */
        .marquee {
          position: relative;
          z-index: 1;
          width: 100%;
          overflow: hidden;
          margin-top: 1rem;
          padding: 0.5rem 0;
          mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 3rem;
          align-items: center;
          animation: scroll 18s linear infinite;
        }
        .logo {
          height: 42px;
          opacity: 0.85;
          filter: grayscale(100%) brightness(1.1);
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .stats { grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
          .value { font-size: 1.6rem; }
        }
        @media (max-width: 700px) {
          .stats { grid-template-columns: 1fr; max-width: 420px; }
          .card { padding: 1.5rem; }
          .quote { font-size: 1.05rem; }
          .logo { height: 34px; }
        }
      `}</style>
    </section>
  )
}
