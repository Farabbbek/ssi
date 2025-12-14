import React from 'react'

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

/**
 * GlassButton - Reusable glassmorphism button component
 * 
 * Features:
 * - Smooth scale + brightness hover effects
 * - Multiple size variants
 * - Loading state support
 * - Icon support
 * - Keyboard accessible
 */
export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  disabled,
  className = '',
  ...props
}: GlassButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const variantClasses = {
    primary: `
      bg-gradient-purple-indigo
      text-white
      hover:shadow-neon-purple
      focus:ring-2 focus:ring-purple-neon focus:ring-offset-2 focus:ring-offset-navy-900
    `,
    secondary: `
      bg-glass-dark
      text-foreground
      border border-glass-border-light
      hover:bg-glass-dark hover:border-glass-border-light
      hover:shadow-neon-indigo
      focus:ring-2 focus:ring-indigo-neon
    `,
    outlined: `
      bg-transparent
      text-purple-neon
      border-2 border-purple-neon
      hover:bg-glass-dark
      hover:shadow-neon-purple
      focus:ring-2 focus:ring-purple-neon
    `,
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        relative
        flex items-center justify-center gap-2
        rounded-lg
        backdrop-blur-glass
        font-semibold
        transition-all duration-300
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 hover:brightness-110
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && !isLoading && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  )
}
