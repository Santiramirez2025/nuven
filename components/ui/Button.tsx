'use client'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined
  as?: 'button'
}

type ButtonAsAnchor = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  as?: 'a'
}

type ButtonBaseProps = {
  variant?: Variant
  size?: Size
  loading?: boolean
}

type ButtonProps = ButtonBaseProps & (ButtonAsButton | ButtonAsAnchor)

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-black font-bold hover:bg-[#5dcc8c] hover:-translate-y-0.5 shadow-[0_12px_40px_rgba(76,186,122,0.25)] hover:shadow-[0_12px_40px_rgba(76,186,122,0.4)] active:translate-y-0',
  secondary:
    'bg-transparent text-[var(--text-2)] border border-[var(--border)] hover:border-[var(--border-accent)] hover:text-[var(--text)]',
  ghost:
    'bg-transparent text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface)]',
  outline:
    'bg-[var(--bg)] text-accent border border-[var(--border-accent)] hover:bg-accent hover:text-black',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-full gap-1.5',
  md: 'px-6 py-3 text-[15px] rounded-full gap-2',
  lg: 'px-9 py-4 text-base rounded-full gap-2.5',
}

const baseClasses =
  'inline-flex items-center justify-center font-syne font-bold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

export function Button({ variant = 'primary', size = 'md', loading, className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  const content = loading ? (
    <>
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      Procesando...
    </>
  ) : children

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor & ButtonBaseProps
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    )
  }

  const { ...buttonProps } = props as ButtonAsButton & ButtonBaseProps
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  )
}

Button.displayName = 'Button'