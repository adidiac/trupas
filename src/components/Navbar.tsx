// src/components/Navbar.tsx
'use client'

import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight - 64)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="inner">
        <a href="#" className="logo">
          <img src="/media/logo.png" alt="Trupas" />
          <span>Trupas</span>
        </a>

        {/* Hamburger uses SVG (renders reliably on iOS) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Deschide meniul"
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" className="hamburger-icon" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
          {['despre','media','membrii','servicii','recenzii','FAQ','contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          z-index: 2000; /* above hero overlays */
          background: rgba(255,227,15,0.28); /* light over hero */
          -webkit-backdrop-filter: saturate(180%) blur(8px);
          backdrop-filter: saturate(180%) blur(8px);
          transition: background 0.3s ease;
          /* iOS tap highlight off */
          -webkit-tap-highlight-color: transparent;
        }
        .nav.scrolled {
          background: rgba(255,227,15,0.82);
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .logo img {
          height: 40px; /* keep inside 64px bar */
          width: auto;
          display: block;
        }
        .logo span {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* Desktop menu */
        .nav-list {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        .nav-list li a {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          transition: opacity .2s ease;
          opacity: .95;
        }
        .nav-list li a:hover { opacity: 1; }

        /* Hamburger (hidden on desktop) */
        .hamburger {
          display: none;
          background: none;
          border: none;
          padding: .5rem;
          margin: 0;
          cursor: pointer;
          color: #fff;              /* sets SVG stroke via currentColor */
          line-height: 0;
        }
        .hamburger-icon {
          width: 28px;
          height: 28px;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,.35)); /* better contrast on bright bg */
        }

        /* Mobile */
        @media (max-width: 768px) {
          .nav-list { display: none; }
          .hamburger { display: inline-flex; }

          .nav-list.open {
            position: fixed;
            top: 64px; left: 0;
            width: 100%;
            height: calc(100vh - 64px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            background: rgba(255,227,15,0.92);
            -webkit-backdrop-filter: saturate(180%) blur(10px);
            backdrop-filter: saturate(180%) blur(10px);
          }
          .nav-list.open li a {
            font-size: 1.25rem;
            color: #1b1231; /* darker text on bright bg for readability */
            font-weight: 800;
          }
          .logo img { height: 36px; }
          .logo span { font-size: 1rem; }
        }
      `}</style>
    </nav>
  )
}
