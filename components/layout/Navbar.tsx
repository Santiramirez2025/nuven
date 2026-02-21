'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const count = totalItems()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-10 transition-all duration-300',
        'bg-[rgba(8,12,10,0.85)] backdrop-blur-xl border-b border-[var(--border)]',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <a href="/" className="font-syne text-xl font-black tracking-widest" aria-label="NUVEN inicio">
        NUV<span className="text-accent">E</span>N
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {[
          { href: '#packs', label: 'Los packs' },
          { href: '#diferencial', label: 'Por qué funciona' },
          { href: '#testimonios', label: 'Resultados' },
          { href: '#faq', label: 'FAQ' },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        onClick={toggleCart}
        className="relative flex items-center gap-2 bg-[var(--surface)] hover:bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-4 py-2 text-sm font-syne font-bold transition-colors"
        aria-label={`Carrito, ${count} items`}
      >
        <span>Mi protocolo</span>
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-black text-[11px] font-black rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
    </header>
  )
}
