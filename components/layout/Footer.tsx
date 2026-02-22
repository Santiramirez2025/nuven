export function Footer() {
  const year = new Date().getFullYear()

  const links = {
    Packs: [
      { href: '/packs/longevidad', label: 'Longevidad' },
      { href: '/packs/energia', label: 'Energía' },
      { href: '/packs/cerebro', label: 'Cerebro' },
      { href: '/packs/fisico', label: 'Físico' },
      { href: '/packs/hormonas', label: 'Hormonas' },
      { href: '/packs/bienestar-mental', label: 'Bienestar Mental' },
    ],
    Empresa: [
      { href: '/nosotros', label: 'Nuestra filosofía' },
      { href: '/ingredientes', label: 'Ingredientes' },
      { href: '/regulacion', label: 'Regulación ANMAT' },
      { href: '/blog', label: 'Blog' },
      { href: '/contacto', label: 'Contacto' },
    ],
    Legal: [
      { href: '/legal/terminos', label: 'Términos y condiciones' },
      { href: '/legal/privacidad', label: 'Política de privacidad' },
      { href: '/legal/devoluciones', label: 'Política de devoluciones' },
      { href: '/legal/anmat', label: 'Datos RNPA' },
    ],
  }

  const trustBadges = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      label: 'RNPA Activo',
      sublabel: 'Registro Nacional',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      label: 'RNE Certificado',
      sublabel: 'Establecimiento habilitado',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>
      ),
      label: 'BPM',
      sublabel: 'Buenas Prácticas de Manufactura',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Envío Gratis',
      sublabel: 'A todo el país',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
      ),
      label: 'Garantía 30D',
      sublabel: 'Devolución sin preguntas',
    },
  ]

  return (
    <footer className="relative bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">

      {/* Ambient glow top-left */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(76,186,122,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Trust bar ── */}
        <div className="py-6 border-b border-[var(--border)] overflow-x-auto">
          <div className="flex items-center gap-2 md:gap-0 md:justify-between min-w-max md:min-w-0">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 md:px-0 group">
                <span className="text-accent flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  {badge.icon}
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] font-bold font-syne text-[var(--text)] tracking-wide uppercase">{badge.label}</p>
                  <p className="text-[10px] text-[var(--text-3)] hidden md:block">{badge.sublabel}</p>
                </div>
                {i < trustBadges.length - 1 && (
                  <span className="hidden md:block ml-4 w-px h-6 bg-[var(--border)] flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-14 pb-12">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div>
              <a href="/" className="font-syne text-2xl font-black tracking-widest inline-block group">
                NUV<span className="text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(76,186,122,0.7)]">E</span>N
              </a>
              <p className="text-[var(--text-3)] text-sm mt-2 italic leading-relaxed">
                Optimización humana desde adentro.
              </p>
            </div>

            {/* Science statement */}
            <div className="border-l-2 border-accent/40 pl-4">
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Formulamos con ingredientes respaldados por evidencia clínica publicada en journals internacionales.
                Sin rellenos. Sin pseudociencia.
              </p>
            </div>

            {/* Regulatory block */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-4 py-3 space-y-1">
              <p className="text-[10px] tracking-[0.15em] text-[var(--text-3)] uppercase font-semibold mb-2">Cumplimiento regulatorio</p>
              <p className="text-xs text-[var(--text-2)]">Suplementos dietarios registrados ante <span className="text-[var(--text)] font-semibold">ANMAT</span>.</p>
              <p className="text-xs text-[var(--text-2)]">Producido en planta habilitada en <span className="text-[var(--text)] font-semibold">Argentina</span>.</p>
              <p className="text-xs text-[var(--text-2)]">No son medicamentos. No reemplazan tratamiento médico.</p>
            </div>
          </div>

          {/* Links — 8 cols / 3 sections */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <h5 className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-3)] mb-5 font-syne">
                  {section}
                </h5>
                <ul className="space-y-3">
                  {items.map(({ href, label }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors duration-150 flex items-center gap-1.5 group"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 flex-shrink-0" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--text-3)] order-2 md:order-1">
            &#169; {year} NUVEN S.A.S &mdash; Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-[var(--text-3)] order-1 md:order-2 text-center leading-relaxed">
            Los resultados pueden variar. Consulte a su médico antes de comenzar cualquier suplementación.
          </p>
        </div>

      </div>
    </footer>
  )
}