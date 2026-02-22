'use client'
import { useEffect, useState, useRef } from 'react'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#packs', label: 'Los packs' },
  { href: '#diferencial', label: 'Por qué funciona' },
  { href: '#testimonios', label: 'Resultados' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeLink, setActiveLink] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const count = totalItems()
  const prevCount = useRef(count)

  useEffect(() => {
    if (count !== prevCount.current) {
      setCartPulse(true)
      const t = setTimeout(() => setCartPulse(false), 600)
      prevCount.current = count
      return () => clearTimeout(t)
    }
  }, [count])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (y / maxScroll) * 100 : 0)

      for (const { href } of [...NAV_LINKS].reverse()) {
        const el = document.querySelector(href)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveLink(href)
          return
        }
      }
      setActiveLink('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-500',
          scrolled
            ? 'bg-[rgba(6,9,7,0.92)] backdrop-blur-2xl border-b border-[var(--border)]'
            : 'bg-transparent'
        )}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />

        <div className={cn(
          'max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}>

          {/* Logo */}
          <a
            href="/"
            className="relative font-syne text-xl font-black tracking-widest group"
            aria-label="NUVEN inicio"
          >
            <span className="relative z-10">
              NUV<span className="text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(76,186,122,0.8)]">E</span>N
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                  activeLink === href
                    ? 'text-[var(--text)] bg-[var(--surface)]'
                    : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,0.04)]'
                )}
              >
                {label}
                {activeLink === href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart button desktop */}
            <button
              onClick={toggleCart}
              className={cn(
                'hidden md:flex relative items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-syne font-bold transition-all duration-300',
                'bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] hover:bg-[rgba(76,186,122,0.06)]',
                cartPulse && 'scale-105'
              )}
              aria-label={`Carrito, ${count} producto${count !== 1 ? 's' : ''}`}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-accent" aria-hidden="true">
                <path d="M1 1h2l1.5 7h7l1.5-7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="13" r="1" fill="currentColor"/>
                <circle cx="11" cy="13" r="1" fill="currentColor"/>
              </svg>
              <span>Mi protocolo</span>
              {count > 0 && (
                <span className={cn(
                  'flex items-center justify-center w-5 h-5 bg-accent text-black text-[11px] font-black rounded-full transition-transform duration-300',
                  cartPulse && 'scale-125'
                )}>
                  {count}
                </span>
              )}
            </button>

            {/* Cart button mobile */}
            <button
              onClick={toggleCart}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]"
              aria-label={`Carrito, ${count} productos`}
            >
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" className="text-accent">
                <path d="M1 1h2l1.5 7h7l1.5-7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="13" r="1" fill="currentColor"/>
                <circle cx="11" cy="13" r="1" fill="currentColor"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full border border-[var(--border)] bg-[var(--surface)]"
              aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              <span className={cn('w-4 h-px bg-[var(--text)] transition-all duration-300 origin-center', mobileOpen && 'rotate-45 translate-y-[6px]')} />
              <span className={cn('w-4 h-px bg-[var(--text)] transition-all duration-300', mobileOpen && 'opacity-0 scale-x-0')} />
              <span className={cn('w-4 h-px bg-[var(--text)] transition-all duration-300 origin-center', mobileOpen && '-rotate-45 -translate-y-[6px]')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-20 md:hidden transition-all duration-400',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cn('absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300', mobileOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={cn(
            'absolute top-0 right-0 h-full w-72 bg-[var(--bg-3)] border-l border-[var(--border)] flex flex-col pt-24 pb-10 px-8 transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <p className="text-[10px] tracking-[0.2em] text-[var(--text-3)] uppercase mb-8 font-medium">Navegar</p>
          <ul className="space-y-1 flex-1">
            {NAV_LINKS.map(({ href, label }, i) => (
              <li
                key={href}
                style={{ transitionDelay: mobileOpen ? `${i * 50 + 100}ms` : '0ms' }}
                className={cn('transition-all duration-300', mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4')}
              >
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between w-full py-3.5 text-base font-medium border-b border-[var(--border)] transition-colors',
                    activeLink === href ? 'text-accent' : 'text-[var(--text-2)] hover:text-[var(--text)]'
                  )}
                >
                  {label}
                  <span className="text-[var(--text-3)] text-lg">&#8594;</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={cn('transition-all duration-300 delay-300', mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <button
              onClick={() => { toggleCart(); setMobileOpen(false) }}
              className="w-full bg-accent text-black font-syne font-bold rounded-full py-4 text-sm hover:bg-[#5dcc8c] transition-colors"
            >
              Ver mi protocolo {count > 0 && `(${count})`}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}