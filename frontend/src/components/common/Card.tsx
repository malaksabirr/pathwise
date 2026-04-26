import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
  delay?: number
}

export function Card({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                '0 20px 40px -12px rgba(79, 70, 229, 0.15), 0 8px 20px -8px rgba(6, 182, 212, 0.1)',
            }
          : undefined
      }
      onClick={onClick}
      className={cn(
        'relative bg-white rounded-2xl border border-slate-100 overflow-hidden',
        'shadow-soft transition-shadow duration-300',
        glow && 'shadow-glow',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-teal-500/5 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('px-6 pt-6 pb-2', className)}>{children}</div>
  )
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 bg-slate-50/50 border-t border-slate-100',
        className
      )}
    >
      {children}
    </div>
  )
}
