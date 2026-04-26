import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Zap, Award } from 'lucide-react'

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  shape: 'circle' | 'square' | 'triangle' | 'star'
  delay: number
}

function generateParticles(count: number): Particle[] {
  const colors = [
    '#4F46E5', '#06B6D4', '#14B8A6', '#F59E0B', '#EC4899',
    '#8B5CF6', '#10B981', '#F97316', '#3B82F6', '#EF4444',
  ]
  const shapes: Particle['shape'][] = ['circle', 'square', 'triangle', 'star']

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 720 - 360,
    scale: Math.random() * 0.8 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    delay: Math.random() * 0.5,
  }))
}

function ParticleShape({ shape, color, size }: { shape: Particle['shape']; color: string; size: number }) {
  if (shape === 'circle') {
    return <div className="rounded-full" style={{ width: size, height: size, backgroundColor: color }} />
  }
  if (shape === 'square') {
    return <div className="rounded-sm" style={{ width: size, height: size, backgroundColor: color }} />
  }
  if (shape === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        }}
      />
    )
  }
  return <Star className="fill-current" style={{ width: size, height: size, color }} />
}

interface CelebrationProps {
  show: boolean
  onComplete?: () => void
  message?: string
  submessage?: string
}

export function Celebration({
  show,
  onComplete,
  message = 'Module complété !',
  submessage = 'Félicitations pour votre progression',
}: CelebrationProps) {
  const [particles] = useState(() => generateParticles(60))
  const [badgePop, setBadgePop] = useState(false)

  useEffect(() => {
    if (show) {
      const timer1 = setTimeout(() => setBadgePop(true), 300)
      const timer2 = setTimeout(() => {
        setBadgePop(false)
        onComplete?.()
      }, 3500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* Confetti particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              initial={{
                left: `${50}%`,
                top: `${50}%`,
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                scale: p.scale,
                rotate: p.rotation,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                delay: p.delay,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <ParticleShape shape={p.shape} color={p.color} size={10} />
            </motion.div>
          ))}

          {/* Center badge pop */}
          <AnimatePresence>
            {badgePop && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0, y: -50 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow rings */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1.3], opacity: [0.5, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 blur-xl"
                  />

                  {/* Main badge */}
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <motion.div
                      initial={{ rotate: -20, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-slate-800 mb-1"
                    >
                      {message}
                    </motion.h2>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-500"
                    >
                      {submessage}
                    </motion.p>

                    {/* XP badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.5 }}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200"
                    >
                      <Zap className="w-4 h-4 text-indigo-500" />
                      <span className="font-bold text-indigo-700">+50 XP</span>
                    </motion.div>

                    {/* Mini badges row */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex justify-center gap-3 mt-4"
                    >
                      {[Star, Award, Zap].map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center"
                        >
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook pour déclencher la célébration
export function useCelebration() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('Module complété !')
  const [submessage, setSubmessage] = useState('Félicitations !')

  const trigger = (msg?: string, sub?: string) => {
    if (msg) setMessage(msg)
    if (sub) setSubmessage(sub)
    setShow(true)
  }

  const dismiss = () => setShow(false)

  return { show, trigger, dismiss, message, submessage }
}
