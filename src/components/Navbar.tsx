// src/components/Navbar.tsx
'use client'

import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > window.innerHeight - 64)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={isScrolled ? 'nav scrolled' : 'nav'}>
      <div className="inner">
        <a href="#" className="logo">
          <img src="/media/logo.png" alt="Trupass logo" />
          <span>Trupas</span>
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
          {['despre','media', 'repertoriu', 'servicii', 'recenzii','FAQ','contact'].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
        }
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          z-index: 1000;
          background: rgba(255, 227, 15, 0.3);
          transition: background 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(255, 227, 15, 0.8);
        }
        .inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .logo img {
          height: 120px;
          margin-right: 0.75rem;
        }
        .logo span {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
        }

        /* Desktop menu */
        .nav-list {
          list-style: none;
          display: flex;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        .nav-list li a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-list li a:hover {
          color: #c0ffe0;
        }

        /* Hamburger (hidden on desktop) */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          height: 3px;
          background: #fff;
          border-radius: 2px;
        }

        /* Mobile: collapse desktop menu, show hamburger */
        @media (max-width: 768px) {
          .nav-list {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }

        /* Mobile dropdown */
        .nav-list.open {
          display: flex;
        }
        @media (max-width: 768px) {
          .nav-list.open {
            position: fixed;
            top: 64px;
            left: 0;
            width: 100%;
            height: calc(100vh - 64px);
            background: rgba(255, 227, 15, 0.8);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            overflow-y: auto;
          }
        }
      `}</style>
    </nav>
  )
}
