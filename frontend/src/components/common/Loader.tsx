import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
  className?: string
}

export function Loader({
  size = 'md',
  text = 'Chargement...',
  fullScreen = false,
  className,
}: LoaderProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-4 h-4',
  }

  const container = (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className={cn('relative', sizes[size])}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500',
              dotSizes[size]
            )}
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [
                'calc(-50% + 0px)',
                'calc(-50% + 20px)',
                'calc(-50% - 10px)',
                'calc(-50% + 0px)',
              ],
              y: [
                'calc(-50% + 0px)',
                'calc(-50% - 15px)',
                'calc(-50% + 10px)',
                'calc(-50% + 0px)',
              ],
              scale: [1, 1.3, 0.8, 1],
              opacity: [1, 0.7, 1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-indigo-200/50'
          )}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      {text && (
        <motion.p
          className="text-sm text-slate-500 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {container}
      </div>
    )
  }

  return container
}

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded-lg',
            className
          )}
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  )
}
