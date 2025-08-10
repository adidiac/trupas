// src/components/Repertoire.tsx
'use client'

import React, { useEffect } from 'react'

type Member = {
  role: string
  slug: string         // for icon path, e.g. "voce-feminina"
  name: string         // member’s name; file should be /public/media/members/<name-lower>.jpg|png|webp
  photo?: string       // optional custom path; if omitted we build from name
}

const members: Member[] = [
  { role: 'Voce feminina',  slug: 'voce-feminina',  name: 'Marimi' },
  { role: 'Voce masculina', slug: 'voce-masculina', name: 'Sorin' },
  { role: 'Solista populara', slug: 'solista-populara', name: 'Gabriela' },
  { role: 'Chitara',        slug: 'chitara',        name: 'Alex' },
  { role: 'Bass',           slug: 'bass',           name: 'Sorina' },
  { role: 'Clape',          slug: 'clape',          name: 'Florin' },
  { role: 'Tobe',           slug: 'tobe',           name: 'George' },
  { role: 'Trompeta',       slug: 'trompeta',       name: 'Sorin' },
  { role: 'Saxofon',        slug: 'saxofon',        name: 'Saxofon' },
  { role: 'DJ',             slug: 'dj',             name: 'DJ' },
]

// card background colors (shuffled across)
const colors = [
  '#64fff9', '#f0c040', '#7c4dff', '#42a5f5',
  '#66bb6a', '#ff8a65', '#ba68c8', '#ff4081'
]

// build default photo path from name
function photoFromName(name: string) {
  const base = `/media/members/${name.toLowerCase()}`
  if (name.toLowerCase() === 'saxofon') {
    return [`${base}.png`, `${base}.webp`, `${base}.jpg`, ]
  }
  return [`${base}.jpeg`, `${base}.png`, `${base}.webp`]
}

export default function Repertoire() {
  useEffect(() => {
    const canvas = document.getElementById('bg-particles-rep') as HTMLCanvasElement
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

  return (
    <section id="repertoriu" className="repertoire-section">
      <canvas id="bg-particles-rep" className="bg-canvas" />
      <h2>Componență trupă</h2>

      <div className="cards">
        {members.map((m, idx) => {
          const color = colors[idx % colors.length]
          const candidates = m.photo ? [m.photo] : photoFromName(m.name)

          return (
            <article
              key={`${m.slug}-${m.name}-${idx}`}
              className="card"
              style={{ background: color, animationDelay: `${idx * 0.08}s` }}
            >
              <div className="thumb">
                {/* actual photo; if it fails, we hide it and show the icon */}
                <img
                  className="member-photo"
                  src={candidates[0]}
                  srcSet={candidates.join(', ')}
                  alt={`${m.role} – ${m.name}`}
                  loading="lazy"
                  onError={(e) => {
                    // hide the broken photo and reveal the icon
                    const img = e.currentTarget
                    img.style.display = 'none'
                    const icon = img.nextElementSibling as HTMLImageElement | null
                    if (icon) icon.style.display = 'block'
                  }}
                />
                {/* fallback role icon (hidden until photo fails) */}
                <img
                  className="role-icon"
                  src={`/media/icons/${m.slug}.png`}
                  alt=""
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />
                {/* soft overlay for readability */}
                <div className="thumb-overlay" />
              </div>

              <div className="meta">
                <h3>{m.role}</h3>
                <span className="chip">{m.name}</span>
              </div>
            </article>
          )
        })}
      </div>

      <style jsx>{`
        .repertoire-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          padding: 4rem 2rem;
          background: #24243e;
          color: #efefef;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
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
          margin: 0.5rem 0 6rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }
        .cards {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(5, minmax(180px, 1fr));
          gap: 2.25rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          border-radius: 1.25rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .card:hover {
          transform: translateY(0) scale(1.03);
          box-shadow: 0 16px 32px rgba(0,0,0,0.45);
        }

        /* IMAGE AREA */
        .thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;   /* guarantees height -> you’ll see the photo */
          border-radius: 0.9rem;
          overflow: hidden;
          background: rgba(0,0,0,0.25);
        }
        .member-photo, .role-icon {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .role-icon {
          object-fit: contain;   /* icons keep proportions */
          padding: 12%;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.35));
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%);
        }

        /* META */
        .meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 0.25rem 0.25rem;
        }
        .meta h3 {
          font-size: 1.25rem;
          color: #fff;
          text-shadow: 0 2px 6px rgba(0,0,0,0.4);
          margin: 0;
          letter-spacing: 0.3px;
        }
        .chip {
          background: rgba(0,0,0,0.28);
          color: #fff;
          font-size: 0.9rem;
          padding: 0.35rem 0.6rem;
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1200px) {
          .cards { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 920px) {
          .cards { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 680px) {
          .cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 460px) {
          .cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
