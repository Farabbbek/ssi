import React from 'react'

export interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'dark' | 'gradient'
  interactive?: boolean
}

/**
 * GlassCard - Reusable glassmorphism card component
 * 
 * Features:
 * - Backdrop blur effect
 * - Semi-transparent glass background
 * - Subtle border with glass aesthetic
 * - Optional hover effects
 * - Multiple variants
 */
export function GlassCard({
  children,
  className = '',
  variant = 'default',
  interactive = false,
}: GlassCardProps) {
  const variantClasses = {
    default: 'bg-glass-dark border-glass-border',
    dark: 'bg-glass-darker border-glass-border',
    gradient: 'bg-gradient-glass border-glass-border-light',
  }

  const interactiveClasses = interactive
    ? 'hover:bg-glass-dark hover:border-glass-border-light hover:shadow-glass-lg cursor-pointer'
    : ''

  return (
    <div
      className={`
        rounded-xl
        backdrop-blur-glass
        border
        ${variantClasses[variant]}
        shadow-glass
        ${interactiveClasses}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
