export function MarqueeBar() {
  const items = [
    'Fórmulas con respaldo científico',
    'Dosis estratégicas, no simbólicas',
    'Sin rellenos ni aditivos innecesarios',
    'Ingredientes de calidad farmacéutica',
    'Director técnico habilitado',
    'Producido y registrado en Argentina',
    'Sistema modular sin solapamientos',
  ]

  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-t border-b border-[var(--border)] py-4 bg-[var(--bg-2)]"
      aria-hidden="true"
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {allItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-3)] flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
