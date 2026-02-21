export function Footer() {
  const year = new Date().getFullYear()

  const links = {
    packs: [
      { href: '/packs/longevidad', label: 'Longevidad' },
      { href: '/packs/energia', label: 'Energía' },
      { href: '/packs/cerebro', label: 'Cerebro' },
      { href: '/packs/fisico', label: 'Físico' },
      { href: '/packs/hormonas', label: 'Hormonas' },
      { href: '/packs/bienestar-mental', label: 'Bienestar Mental' },
    ],
    empresa: [
      { href: '/nosotros', label: 'Nuestra filosofía' },
      { href: '/ingredientes', label: 'Ingredientes' },
      { href: '/regulacion', label: 'Regulación ANMAT' },
      { href: '/blog', label: 'Blog' },
      { href: '/contacto', label: 'Contacto' },
    ],
    legal: [
      { href: '/legal/terminos', label: 'Términos y condiciones' },
      { href: '/legal/privacidad', label: 'Política de privacidad' },
      { href: '/legal/devoluciones', label: 'Política de devoluciones' },
      { href: '/legal/anmat', label: 'Datos RNPA' },
    ],
  }

  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="font-syne text-2xl font-black tracking-widest">
              NUV<span className="text-accent">E</span>N
            </a>
            <p className="text-[var(--text-3)] text-sm mt-3 italic">
              Optimización humana desde adentro.
            </p>
            <p className="text-[var(--text-3)] text-xs mt-4 leading-relaxed">
              Suplementos dietarios registrados en ANMAT.<br />
              Producido en Argentina.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h5 className="text-xs font-bold tracking-[0.08em] uppercase text-[var(--text-3)] mb-4 capitalize">
                {section}
              </h5>
              <ul className="space-y-2.5">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-3)]">
            © {year} NUVEN. Todos los derechos reservados.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {['RNPA Activo', 'RNE Certificado', 'BPM', 'Garantía 30D'].map((s) => (
              <span
                key={s}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1 text-[11px] font-semibold text-[var(--text-3)] tracking-wide uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
