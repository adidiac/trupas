// src/components/Hero.tsx
'use client'

import React, { useEffect, useState } from 'react'

export default function Hero() {
  const messages = [
    'Trupas - Muzică live pentru evenimente de neuitat',
    'Energie pură pentru nunta ta',
    'Emoție în fiecare notă',
    'Profesionalism garantat',
    'Momente de neuitat',
    'Repertoriu personalizat pentru tine',
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((p) => (p + 1) % messages.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  // If a side video errors, just hide it so layout doesn't look broken
  const hideOnError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <section className="hero-three" aria-label="Hero Trupas">
      {/* Desktop: 3 videos. Mobile: only center (CSS below) */}
      <video
        className="vid vid-left"
        src="https://trupas.blob.core.windows.net/videos/video1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={hideOnError}
        aria-hidden="true"
      />
      <video
        className="vid vid-center"
        src="https://trupas.blob.core.windows.net/videos/video2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={hideOnError}
        aria-hidden="true"
      />
      <video
        className="vid vid-right"
        src="https://trupas.blob.core.windows.net/videos/video3.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={hideOnError}
        aria-hidden="true"
      />

      {/* Tint + vignette overlay so the text is readable */}
      <div className="overlay" />

      {/* Rotating tagline */}
      <h1 className="hero-title">
        <span className="title-bg">
          <span key={current} className="fade">
            {messages[current]}
          </span>
        </span>
      </h1>

      <style jsx>{`
        .hero-three {
          position: relative;
          margin-top: -64px; /* sit under the fixed navbar */
          width: 100vw;
          height: calc(100vh + 64px);
          display: flex;
          overflow: hidden;
          background: #000; /* safe background while videos load */
        }

        .vid {
          flex: 1;
          height: calc(100vh + 64px);
          width: auto;
          object-fit: cover;
          /* push crop slightly down to keep faces in frame on portrait videos */
          object-position: 50% 68%;
          background: #000;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.6) 100%),
            rgba(59, 6, 82, 0.45);
          pointer-events: none;
          z-index: 1;
        }

        .hero-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: min(90vw, 1000px);
          text-align: center;
          line-height: 1.15;
        }

        .title-bg {
          display: inline-block;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          backdrop-filter: blur(6px);
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .hero-title .fade {
          display: inline-block;
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.5px;
          font-size: clamp(1.75rem, 5.2vw, 4.5rem);
          opacity: 0;
          animation: fadeIn 900ms ease-out forwards;
          white-space: normal; /* allow wrapping */
          word-break: keep-all;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Mobile: show only center video full-screen */
        @media (max-width: 768px) {
          .vid-left,
          .vid-right {
            display: none !important;
          }
          .vid-center {
            flex: none;
            width: 100vw;
            height: calc(100vh + 64px);
            margin-top: -64px;
            object-position: 50% 70%;
          }
          .title-bg {
            padding: 0.5rem 0.75rem;
            border-radius: 10px;
          }
        }
      `}</style>
    </section>
  )
}
