import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, BookOpen, Zap } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../common/Card'
import { Badge } from '../common/Badge'
import { ProgressBar } from '../common/ProgressBar'
import { useApp } from '../../context/AppContext'
import { getLevelConfig, getNextLevel, getLevelProgressLabel } from '../../utils/levelUtils'
import type { Level } from '../../utils/levelUtils'

export function LevelDetector() {
  const { state } = useApp()
  const { level } = state

  if (!level) {
    return (
      <Card className="p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 mx-auto mb-4"
        >
          <Sparkles className="w-12 h-12 text-indigo-400" />
        </motion.div>
        <p className="text-slate-500">Analyse de votre niveau en cours...</p>
      </Card>
    )
  }

  const config = getLevelConfig(level.level as Level)
  const nextLevel = getNextLevel(level.level as Level)
  const nextLevelLabel = getLevelProgressLabel(level.level as Level)

  const stats = [
    {
      icon: BookOpen,
      label: 'Base solide',
      value: level.level === 'debutant' ? 30 : level.level === 'intermediaire' ? 65 : 90,
      color: 'from-sky-400 to-sky-500',
    },
    {
      icon: TrendingUp,
      label: 'Progression',
      value: level.level === 'debutant' ? 40 : level.level === 'intermediaire' ? 70 : 95,
      color: 'from-indigo-400 to-cyan-500',
    },
    {
      icon: Zap,
      label: 'Compétences clés',
      value: level.level === 'debutant' ? 25 : level.level === 'intermediaire' ? 60 : 85,
      color: 'from-cyan-400 to-teal-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Level Card */}
      <Card glow className="overflow-visible">
        <CardHeader className="text-center pb-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-6xl mb-4"
          >
            {config.icon}
          </motion.div>
          <Badge level={level.level as Level} size="lg" animated>{level.level === 'debutant' ? 'Débutant' : level.level === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</Badge>
        </CardHeader>
        <CardBody className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 mb-6 max-w-md mx-auto"
          >
            {config.description}
          </motion.p>

          {/* Score Progress */}
          <div className="mb-6">
            <ProgressBar
              progress={level.score}
              max={100}
              variant="gradient"
              size="lg"
            />
          </div>

          {nextLevel && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-full text-sm text-indigo-700 font-medium"
            >
              <TrendingUp className="w-4 h-4" />
              {nextLevelLabel}
            </motion.div>
          )}
        </CardBody>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card>
              <CardBody className="text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {stat.value}%
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
                <div className="mt-3">
                  <ProgressBar
                    progress={stat.value}
                    max={100}
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analysis Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-50 via-cyan-50 to-teal-50 rounded-xl p-6 border border-indigo-100"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-1">
              Analyse personnalisée
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Basé sur votre profil, notre système a déterminé que vous êtes au
              niveau <strong>{config.label}</strong>. Nous allons maintenant
              générer un parcours d'apprentissage adapté à vos objectifs et à
              votre rythme de {state.profile?.timePerWeek}h par semaine.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
