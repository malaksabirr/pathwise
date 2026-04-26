import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Level } from '../../utils/levelUtils'
import { levelConfigs } from '../../utils/levelUtils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'level'
  level?: Level
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
  icon?: React.ReactNode
}

export function Badge({
  children,
  variant = 'default',
  level,
  size = 'md',
  animated = false,
  className,
  icon,
}: BadgeProps) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    md: 'px-3 py-1 text-sm rounded-lg',
    lg: 'px-4 py-1.5 text-base rounded-xl',
  }

  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    level: level ? levelConfigs[level].bgColor + ' ' + levelConfigs[level].color + ' ' + levelConfigs[level].borderColor : 'bg-slate-100 text-slate-700',
  }

  const classNameValue = cn(
    'inline-flex items-center gap-1.5 font-semibold border',
    sizes[size],
    variant === 'level' && level
      ? `${levelConfigs[level].bgColor} ${levelConfigs[level].color} ${levelConfigs[level].borderColor}`
      : variants[variant],
    className
  )

  if (animated) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' as const, stiffness: 500, damping: 25 }}
        className={classNameValue}
      >
        {level && <span>{levelConfigs[level].icon}</span>}
        {icon}
        {children}
      </motion.span>
    )
  }

  return (
    <span className={classNameValue}>
      {level && <span>{levelConfigs[level].icon}</span>}
      {icon}
      {children}
    </span>
  )
}

interface TagProps {
  label: string
  color?: string
  onRemove?: () => void
  className?: string
}

export function Tag({ label, color = 'indigo', onRemove, className }: TagProps) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border',
        colorMap[color] || colorMap.indigo,
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </motion.span>
  )
}
