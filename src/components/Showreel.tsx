// src/components/Showreel.tsx  (doar părțile modificate)
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

  // citește consimțământul + ascultă schimbările
  useEffect(() => {
    try {
      setMediaAllowed(localStorage.getItem('consent-media') === 'true')
    } catch {}
    const onMedia = (e: Event) => {
      const det = (e as CustomEvent).detail
      setMediaAllowed(!!det)
    }
    window.addEventListener('consent:media', onMedia as EventListener)
    return () => window.removeEventListener('consent:media', onMedia as EventListener)
  }, [])

  // particles rămâne ca la tine…

  const embedUrl = (id: string, start?: number) => {
    const base = `https://www.youtube-nocookie.com/embed/${id}`
    const params = new URLSearchParams({
      rel: '0', modestbranding: '1', playsinline: '1',
      autoplay: '0', mute: '0', enablejsapi: '1',
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
      {/* ...bg canvas & titlu ca înainte... */}

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
            <span>Acceptă cookie-uri media & redă</span>
          </button>
        )}
      </div>

      {/* …thumb-rail & restul neschimbate… */}

      <style jsx>{`
        .player { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12); }
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
        .gate img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.7; filter: blur(1px);
        }
        .gate span {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          background: #f0c040; color: #0f0c29; font-weight: 800; padding: .8rem 1rem; border-radius: .75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,.4);
          white-space: nowrap; text-align: center;
        }
      `}</style>
    </section>
  )
}
