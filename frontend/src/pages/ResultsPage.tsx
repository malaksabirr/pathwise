import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  TrendingUp,
  BookOpen,
  Target,
  RotateCcw,
  Zap,
  Star,
  ChevronRight,
  Flame,
  Crown,
  Rocket,
  Diamond,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { Card, CardBody } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { ProgressBar } from '../components/common/ProgressBar'
import { UserHeader } from '../components/layout/UserHeader'
import { Celebration } from '../components/animations/Celebration'
import { useApp } from '../context/AppContext'

export function ResultsPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const [showCelebration, setShowCelebration] = useState(false)

  const { level, quizResult, resources } = state

  const completedResources = resources.filter((r) => r.completed).length
  const totalResources = resources.length
  const completionRate = totalResources > 0 ? (completedResources / totalResources) * 100 : 0
  const xp = (quizResult?.score || 0) * 50 + completedResources * 10

  const achievements = [
    {
      icon: BookOpen,
      label: 'Profil créé',
      description: 'Vous avez défini vos objectifs',
      unlocked: true,
      color: 'from-indigo-400 to-indigo-500',
    },
    {
      icon: Target,
      label: 'Niveau détecté',
      description: level
        ? `Niveau ${level.level}`
        : 'En attente de détection',
      unlocked: !!level,
      color: 'from-cyan-400 to-cyan-500',
    },
    {
      icon: Rocket,
      label: 'Parcours commencé',
      description: `${completedResources} ressources consultées`,
      unlocked: completedResources > 0,
      color: 'from-sky-400 to-blue-500',
    },
    {
      icon: Star,
      label: 'Quiz complété',
      description: quizResult
        ? `${Math.round((quizResult.score / quizResult.total) * 100)}% de réussite`
        : 'En attente',
      unlocked: !!quizResult,
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Crown,
      label: 'Série gagnante',
      description: '3 jours de suite',
      unlocked: true,
      color: 'from-violet-400 to-purple-500',
    },
    {
      icon: Diamond,
      label: 'Parcours terminé',
      description: 'Toutes les ressources complétées',
      unlocked: completionRate === 100 && totalResources > 0,
      color: 'from-teal-400 to-emerald-500',
    },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Celebration
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
        message="Niveau supérieur !"
        submessage="Vous avez débloqué un nouveau badge"
      />

      <UserHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-800"
          >
            Vos progrès, {state.profile?.name || 'Apprenant'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 mt-1"
          >
            Suivez l'évolution de votre parcours d'apprentissage
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, value: `${completedResources}/${totalResources}`, label: 'Ressources', color: 'text-indigo-500' },
            { icon: TrendingUp, value: `${Math.round(completionRate)}%`, label: 'Progression', color: 'text-cyan-500' },
            { icon: Trophy, value: `${unlockedCount}/${achievements.length}`, label: 'Badges', color: 'text-amber-500' },
            { icon: Flame, value: `${xp}`, label: 'XP Total', color: 'text-rose-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card>
                <CardBody className="text-center py-5">
                  <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-slate-800">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardBody>
              <h3 className="font-semibold text-slate-700 mb-4">
                Progression globale
              </h3>
              <ProgressBar
                progress={completionRate}
                max={100}
                size="lg"
                variant="gradient"
              />
            </CardBody>
          </Card>
        </motion.div>

        {/* Achievements with badge pop animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Vos accomplissements
            </h2>
            <button
              onClick={() => setShowCelebration(true)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Tester animation
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card
                  className={achievement.unlocked ? '' : 'opacity-50'}
                  hover={achievement.unlocked}
                >
                  <CardBody className="flex items-center gap-4">
                    <motion.div
                      whileHover={achievement.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <achievement.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800">
                          {achievement.label}
                        </h4>
                        {achievement.unlocked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, delay: 0.8 + index * 0.1 }}
                            className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        {achievement.description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Result */}
        {quizResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card glow>
              <CardBody className="text-center py-6">
                <h3 className="font-bold text-slate-800 mb-2">
                  Dernier quiz
                </h3>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {Math.round((quizResult.score / quizResult.total) * 100)}%
                </div>
                <p className="text-slate-500 mb-4">
                  {quizResult.score} bonnes réponses sur {quizResult.total}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/quiz')}
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  Recommencer le quiz
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Et maintenant ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/learning')}
              variant="primary"
              icon={<ChevronRight className="w-5 h-5" />}
            >
              Continuer d'apprendre
            </Button>
            <Button
              onClick={() => navigate('/quiz')}
              variant="outline"
              icon={<Zap className="w-5 h-5" />}
            >
              Nouveau quiz
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
