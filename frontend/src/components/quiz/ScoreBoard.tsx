import { motion } from 'framer-motion'
import {
  Trophy,
  Target,
  TrendingUp,
  Award,
  RotateCcw,
  ArrowRight,
  Zap,
  Star,
} from 'lucide-react'
import { Card, CardBody } from '../common/Card'
import { Button } from '../common/Button'
import { Badge } from '../common/Badge'
import { ProgressBar } from '../common/ProgressBar'
import {
  formatPercentage,
  getGradeLabel,
} from '../../utils/formatScore'
import type { QuizResult } from '../../context/AppContext'

interface ScoreBoardProps {
  result: QuizResult
  onRetry?: () => void
  onContinue?: () => void
}

export function ScoreBoard({ result, onRetry, onContinue }: ScoreBoardProps) {
  const percentage = Math.round((result.score / result.total) * 100)
  const gradeLabel = getGradeLabel(percentage)
  // const gradeColor = getGradeColor(percentage) // Available for future use

  const getGradeIcon = () => {
    if (percentage >= 90) return <Trophy className="w-12 h-12 text-amber-500" />
    if (percentage >= 75) return <Award className="w-12 h-12 text-indigo-500" />
    if (percentage >= 60) return <Star className="w-12 h-12 text-cyan-500" />
    return <Target className="w-12 h-12 text-slate-400" />
  }

  const getMessage = () => {
    if (percentage >= 90)
      return 'Excellente performance ! Vous maîtrisez parfaitement ces concepts.'
    if (percentage >= 75)
      return 'Très bon travail ! Quelques ajustements et vous serez au top.'
    if (percentage >= 60)
      return 'Bons résultats ! Continuez sur cette voie pour progresser.'
    if (percentage >= 50)
      return 'Pas mal ! Des révisions ciblées vous aideront à progresser.'
    return "Ne vous découragez pas ! Chaque erreur est une occasion d'apprendre."
  }

  const stats = [
    {
      icon: Target,
      label: 'Réponses correctes',
      value: `${result.score}/${result.total}`,
      color: 'from-indigo-400 to-indigo-500',
    },
    {
      icon: TrendingUp,
      label: 'Pourcentage',
      value: `${percentage}%`,
      color: 'from-cyan-400 to-cyan-500',
    },
    {
      icon: Zap,
      label: 'Note',
      value: gradeLabel,
      color: 'from-teal-400 to-teal-500',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Main Score Card */}
      <Card glow>
        <CardBody className="text-center py-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-200 flex items-center justify-center"
          >
            {getGradeIcon()}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {formatPercentage(result.score, result.total)}
            </h2>
            <Badge variant={percentage >= 60 ? 'success' : 'warning'} size="lg">
              {gradeLabel}
            </Badge>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 mt-4 max-w-md mx-auto"
          >
            {getMessage()}
          </motion.p>

          {/* Score Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <ProgressBar
              progress={result.score}
              max={result.total}
              size="lg"
              variant="gradient"
            />
          </motion.div>
        </CardBody>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card>
              <CardBody className="text-center py-5">
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-slate-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardBody>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Nos recommandations
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-indigo-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-slate-600 text-sm">{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            icon={<RotateCcw className="w-5 h-5" />}
          >
            Recommencer
          </Button>
        )}
        {onContinue && (
          <Button
            onClick={onContinue}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Continuer mon parcours
          </Button>
        )}
      </motion.div>
    </div>
  )
}
