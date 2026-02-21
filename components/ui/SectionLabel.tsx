import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function SectionLabel({ children, className, centered }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] uppercase text-accent mb-4',
        'before:content-[""] before:inline-block before:w-6 before:h-px before:bg-accent',
        centered && 'justify-center',
        className
      )}
    >
      {children}
    </p>
  )
}
