// src/components/Repertoire.tsx
'use client'

import React, { useEffect, useMemo } from 'react'

const lineup = [
  'Voce feminina',
  'Voce masculina',
  'Solista populara',
  'Chitara',
  'Bass',
  'Clape',
  'Tobe',
  'Trompeta',
  'Saxofon',
  'DJ',
]

// contrasting color palette
const colors = [
  '#f0c040', // gold
  '#64fff9', // cyan
  '#ff4081', // pink
  '#7c4dff', // purple
  '#42a5f5', // blue
  '#66bb6a', // green
  '#ff8a65', // coral
  '#ba68c8', // orchid
]

export default function Repertoire() {
  // generate a random color assignment once per render
  const bgColors = useMemo(
    () => lineup.map(() => colors[Math.floor(Math.random() * colors.length)]),
    []
  )

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
        {lineup.map((role, idx) => {
          const slug = role
            .toLowerCase()
            .replace(/[^a-z\u0103\u00e2\u00ee\u015f\u0163]+/g, '-')
            .replace(/-+$/, '')
          return (
            <div
              key={role}
              className="card"
              style={{
                animationDelay: `${idx * 0.1}s`,
                background: bgColors[idx],
              }}
            >
              <img
                src={`/media/icons/${slug}.png`}
                alt={role}
                className="role-icon"
              />
              <span>{role}</span>
            </div>
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .repertoire-section h2 {
          position: relative;
          z-index: 1;
          font-size: 3rem;
          margin: 0.5rem 0 12rem;
          background: linear-gradient(90deg, #64fff9, #f0c040);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s ease-out;
        }
        .cards {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(5, minmax(140px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .card {
          border-radius: 1rem;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .role-icon {
          width: 120px;
          height: 120px;
          margin-bottom: 1.5rem;
        }
        .card span {
          font-weight: 600;
          font-size: 1.2rem;
          color: #fff;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 1024px) {
          .cards {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cards {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin: 0 auto;
          }
          .card {
            width: 80%;
            max-width: 300px;
            padding: 1.5rem;
          }
          .role-icon {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>
    </section>
  )
}
