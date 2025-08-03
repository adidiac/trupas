// src/components/Hero.tsx
'use client'

import React, { useState, useEffect } from 'react'

export default function Hero() {
  const messages = [
    "Trupas - Muzică live pentru evenimente de neuitat",
    'Energie pură pentru nunta ta',
    'Emoție în fiecare notă',
    'Profesionalism garantat',
    'Momente de neuitat',
    'Repertoriu personalizat pentru tine',
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-three">
      <video
        className="vid vid-left"
        src="https://trupas.blob.core.windows.net/videos/video1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <video
        className="vid vid-center"
        src="https://trupas.blob.core.windows.net/videos/video2.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <video
        className="vid vid-right"
        src="https://trupas.blob.core.windows.net/videos/video3.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="overlay" />

      <h1 className="hero-title">
        <span key={current} className="fade">{messages[current]}</span>
      </h1>

      <style jsx>{`
        .hero-three {
          position: relative;
          margin-top: -64px;
          width: 100vw;
          height: calc(100vh + 64px);
          display: flex;
          overflow: hidden;
        }
        .vid {
          flex: 1;
          height: calc(100vh + 64px);
          width: auto;
          object-fit: cover;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(59, 6, 82, 0.5);
          pointer-events: none;
        }
        .hero-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          z-index: 2;
          height: 1.2em;
          overflow: hidden;
        }
        .hero-title .fade {
          display: inline-block;
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .vid-left,
          .vid-right {
            display: none;
          }
          .vid-center {
            flex: none;
            width: 100vw;
            height: calc(100vh + 64px);
            margin-top: -64px;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}
