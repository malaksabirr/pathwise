import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, TrendingUp, X, ChevronRight, Target } from 'lucide-react'
import { Button } from '../common/Button'

interface CompletionModalProps {
  show: boolean
  onClose: () => void
  moduleName?: string
  xp?: number
  nextModule?: string
}

function Firework({ delay, x }: { delay: number; x: number }) {
  const colors = ['#4F46E5', '#06B6D4', '#14B8A6', '#F59E0B', '#EC4899']
  const [exploded, setExploded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setExploded(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!exploded) return null

  return (
    <div className="absolute" style={{ left: `${x}%`, bottom: '20%' }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const distance = 60 + Math.random() * 40
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance - 100,
              scale: [1, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

export function CompletionModal({
  show,
  onClose,
  moduleName = 'Module',
  xp = 50,
  nextModule = 'Prochain module',
}: CompletionModalProps) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (show) {
      setStage(0)
      const t1 = setTimeout(() => setStage(1), 400)
      const t2 = setTimeout(() => setStage(2), 800)
      const t3 = setTimeout(() => setStage(3), 1200)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900"
            onClick={onClose}
          />

          {/* Fireworks */}
          <Firework delay={300} x={20} />
          <Firework delay={600} x={50} />
          <Firework delay={900} x={80} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Top gradient header */}
              <div className="relative bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-500 p-8 text-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Trophy icon with animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="relative mx-auto w-24 h-24 mb-4"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  <div className="relative w-full h-full rounded-full bg-white/30 backdrop-blur flex items-center justify-center border-2 border-white/40">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white mb-1"
                >
                  Félicitations !
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80"
                >
                  Vous avez terminé <strong>{moduleName}</strong>
                </motion.p>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* XP earned */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={stage >= 1 ? { scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span className="text-2xl font-bold text-amber-700">+{xp}</span>
                    <span className="text-amber-600">XP gagnés</span>
                  </div>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={stage >= 2 ? { y: 0, opacity: 1 } : {}}
                  className="grid grid-cols-3 gap-3 mb-6"
                >
                  {[
                    { icon: Star, label: 'Score', value: '100%', color: 'text-amber-500' },
                    { icon: TrendingUp, label: 'Streak', value: '3 jours', color: 'text-emerald-500' },
                    { icon: Target, label: 'Précision', value: '95%', color: 'text-indigo-500' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-3 rounded-xl bg-slate-50"
                    >
                      <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                      <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* New badge earned */}
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={stage >= 3 ? { y: 0, opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring' }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 mb-6"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0"
                  >
                    <Star className="w-6 h-6 text-white fill-white" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-indigo-800">
                      Nouveau badge débloqué !
                    </div>
                    <div className="text-sm text-indigo-600">
                      Premier module complété
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={onClose}
                    icon={<ChevronRight className="w-5 h-5" />}
                    className="w-full"
                  >
                    Continuer vers {nextModule}
                  </Button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
