import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format ARS price from cents */
export function formatARS(cents: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

/** Calculate subscription savings percentage */
export function savingsPercent(price: number, subPrice: number): number {
  return Math.round(((price - subPrice) / price) * 100)
}

/** Stagger animation delay for lists */
export function staggerDelay(index: number, base = 0.1): string {
  return `${index * base}s`
}
