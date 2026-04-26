import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'steps'
  className?: string
  labelClassName?: string
}

export function ProgressBar({
  progress,
  max = 100,
  showLabel = true,
  size = 'md',
  variant = 'gradient',
  className,
  labelClassName,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100))

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-5',
  }

  const getGradient = () => {
    if (percentage < 33)
      return 'from-sky-400 to-sky-500'
    if (percentage < 66)
      return 'from-indigo-400 to-cyan-500'
    return 'from-indigo-500 via-cyan-500 to-teal-500'
  }

  if (variant === 'steps') {
    const steps = 6
    const activeSteps = Math.round((percentage / 100) * steps)
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {Array.from({ length: steps }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'flex-1 h-2 rounded-full transition-colors duration-300',
              i < activeSteps
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500'
                : 'bg-slate-200'
            )}
            initial={false}
            animate={i < activeSteps ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
        {showLabel && (
          <span
            className={cn(
              'text-sm font-semibold text-slate-600 ml-2',
              labelClassName
            )}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={cn('text-sm font-medium text-slate-600', labelClassName)}>
            Progression
          </span>
          <motion.span
            className="text-sm font-bold text-indigo-600"
            key={Math.round(percentage)}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-slate-100 rounded-full overflow-hidden',
          sizes[size]
        )}
      >
        <motion.div
          className={cn(
            'h-full rounded-full',
            variant === 'gradient'
              ? `bg-gradient-to-r ${getGradient()}`
              : 'bg-indigo-500'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {percentage > 0 && (
            <div className="w-full h-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
