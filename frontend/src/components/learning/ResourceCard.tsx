import { motion } from 'framer-motion'
import {
  Play,
  FileText,
  PenTool,
  Wrench,
  ExternalLink,
  Clock,
  BarChart3,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { Card, CardHeader, CardBody, CardFooter } from '../common/Card'
import { Badge } from '../common/Badge'
import type { Resource } from '../../context/AppContext'

interface ResourceCardProps {
  resource: Resource
  onToggleComplete?: (id: string) => void
  delay?: number
}

const typeConfig = {
  video: {
    icon: Play,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    label: 'Vidéo',
  },
  article: {
    icon: FileText,
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-600',
    label: 'Article',
  },
  exercice: {
    icon: PenTool,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    label: 'Exercice',
  },
  projet: {
    icon: Wrench,
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    label: 'Projet',
  },
}

const difficultyConfig = {
  Facile: { color: 'text-emerald-600 bg-emerald-50' },
  Moyen: { color: 'text-amber-600 bg-amber-50' },
  Difficile: { color: 'text-rose-600 bg-rose-50' },
}

export function ResourceCard({
  resource,
  onToggleComplete,
  delay = 0,
}: ResourceCardProps) {
  const config = typeConfig[resource.type] || typeConfig.article
  const Icon = config.icon
  const diffConfig =
    difficultyConfig[resource.difficulty as keyof typeof difficultyConfig] ||
    difficultyConfig.Facile

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card
        hover
        className={`${resource.completed ? 'opacity-75' : ''}`}
      >
        {/* Type Header */}
        <div
          className={`h-2 bg-gradient-to-r ${config.color} rounded-t-2xl`}
        />

        <CardHeader>
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}
            >
              <Icon className={`w-6 h-6 ${config.textColor}`} />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={resource.completed ? 'success' : 'default'} size="sm">
                {resource.completed ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Fait
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Circle className="w-3 h-3" />
                    À faire
                  </span>
                )}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <h3
            className={`font-bold text-lg mb-2 ${
              resource.completed ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {resource.title}
          </h3>
          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
            {resource.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${diffConfig.color}`}
            >
              <BarChart3 className="w-3 h-3" />
              {resource.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {resource.duration}
            </span>
          </div>
        </CardBody>

        <CardFooter className="flex items-center justify-between">
          {onToggleComplete && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleComplete(resource.id)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                resource.completed
                  ? 'text-slate-500 hover:bg-slate-100'
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {resource.completed ? 'Marquer non fait' : 'Marquer fait'}
            </motion.button>
          )}
          <motion.a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ouvrir
          </motion.a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
