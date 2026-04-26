import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  icon,
}: ButtonProps) {
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-200',
    secondary:
      'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 shadow-lg shadow-teal-200',
    outline:
      'border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    danger:
      'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {loading && (
        <Loader2 className="w-5 h-5 animate-spin" />
      )}
      {!loading && icon}
      {children}
    </motion.button>
  )
}
