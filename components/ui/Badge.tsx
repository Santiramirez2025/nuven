import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'gold'
  className?: string
  dot?: boolean
}

export function Badge({ children, variant = 'default', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase',
        variant === 'default' && 'bg-[var(--surface)] border border-[var(--border-accent)] text-accent',
        variant === 'accent' && 'bg-accent text-black',
        variant === 'gold' && 'bg-transparent border border-[var(--gold)] text-[var(--gold)]',
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-[pulseDot_2s_infinite]" />
      )}
      {children}
    </span>
  )
}
