import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
} from 'lucide-react'
import { Card, CardBody } from '../common/Card'
import { ProgressBar } from '../common/ProgressBar'
import type { Resource } from '../../context/AppContext'

interface LearningPathProps {
  resources: Resource[]
  onSelectResource: (resource: Resource) => void
}

interface PathNode {
  id: string
  title: string
  status: 'completed' | 'current' | 'locked'
  type: string
  position: { x: number; y: number }
}

export function LearningPath({ resources, onSelectResource }: LearningPathProps) {
  const completedCount = resources.filter((r) => r.completed).length
  const progress = resources.length > 0 ? (completedCount / resources.length) * 100 : 0

  // Create a visual path from resources
  const nodes: PathNode[] = resources.map((resource, index) => ({
    id: resource.id,
    title: resource.title,
    status: resource.completed
      ? 'completed'
      : index === completedCount
        ? 'current'
        : 'locked',
    type: resource.type,
    position: {
      x: index % 2 === 0 ? 20 : 80,
      y: (index / Math.max(resources.length - 1, 1)) * 100,
    },
  }))

  const getNodeColor = (status: PathNode['status']) => {
    switch (status) {
      case 'completed':
        return 'from-emerald-400 to-teal-500 shadow-emerald-200'
      case 'current':
        return 'from-indigo-500 to-cyan-500 shadow-indigo-200 animate-pulse-soft'
      case 'locked':
        return 'from-slate-300 to-slate-400 shadow-slate-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬'
      case 'article':
        return '📄'
      case 'exercice':
        return '✏️'
      case 'projet':
        return '🛠️'
      default:
        return '📚'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Votre parcours
          </h2>
          <p className="text-slate-500 mt-1">
            {completedCount}/{resources.length} étapes complétées
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-semibold text-amber-700">
            {Math.round(progress)}% accompli
          </span>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar progress={progress} max={100} variant="steps" />

      {/* Visual Path */}
      <div className="relative">
        {/* SVG Path Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          {nodes.length > 1 && (
            <motion.path
              d={`M ${nodes[0].position.x}% ${nodes[0].position.y}% ${nodes
                .slice(1)
                .map(
                  (n) =>
                    `Q ${n.position.x === 20 ? 50 : 50}% ${n.position.y}% ${n.position.x}% ${n.position.y}%`
                )
                .join(' ')}`}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          )}
        </svg>

        {/* Nodes */}
        <div className="relative z-10 space-y-6">
          {resources.map((resource, index) => {
            const node = nodes[index]
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`flex items-center gap-4 ${
                  isLeft ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Node Circle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    node.status !== 'locked' && onSelectResource(resource)
                  }
                  disabled={node.status === 'locked'}
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${getNodeColor(
                    node.status
                  )} shadow-lg flex items-center justify-center text-2xl flex-shrink-0 transition-all ${
                    node.status === 'locked'
                      ? 'opacity-60 cursor-not-allowed'
                      : 'cursor-pointer hover:shadow-xl'
                  }`}
                >
                  {node.status === 'completed' ? (
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  ) : node.status === 'locked' ? (
                    <Lock className="w-6 h-6 text-white/70" />
                  ) : (
                    <span>{getTypeIcon(resource.type)}</span>
                  )}
                  {node.status === 'current' && (
                    <motion.div
                      className="absolute -inset-2 rounded-2xl border-2 border-indigo-400"
                      animate={{ scale: [1, 1.15, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Card */}
                <Card
                  className={`flex-1 max-w-md ${
                    node.status === 'current' ? 'ring-2 ring-indigo-400 ring-offset-2' : ''
                  }`}
                  hover={node.status !== 'locked'}
                  onClick={() =>
                    node.status !== 'locked' && onSelectResource(resource)
                  }
                >
                  <CardBody className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-slate-400">
                            Étape {index + 1}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              resource.type === 'video'
                                ? 'bg-rose-50 text-rose-600'
                                : resource.type === 'article'
                                  ? 'bg-sky-50 text-sky-600'
                                  : resource.type === 'exercice'
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'bg-emerald-50 text-emerald-600'
                            }`}
                          >
                            {resource.type}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-800 truncate">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {resource.duration}
                        </p>
                      </div>
                      {node.status === 'current' && (
                        <ArrowRight className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-400 to-teal-500" />
          <span className="text-sm text-slate-500">Complété</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-500 to-cyan-500" />
          <span className="text-sm text-slate-500">En cours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-slate-300 to-slate-400" />
          <span className="text-sm text-slate-500">Bloqué</span>
        </div>
      </div>
    </div>
  )
}
