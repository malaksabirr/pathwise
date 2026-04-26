import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  SortAsc,
  BookOpen,
} from 'lucide-react'
import { ResourceCard } from './ResourceCard'
import { Card, CardBody } from '../common/Card'
import type { Resource } from '../../context/AppContext'

interface ResourceListProps {
  resources: Resource[]
  onToggleComplete?: (id: string) => void
}

type ViewMode = 'grid' | 'list'
type SortMode = 'default' | 'type' | 'difficulty'
type FilterType = 'all' | 'video' | 'article' | 'exercice' | 'projet'

export function ResourceList({
  resources,
  onToggleComplete,
}: ResourceListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortMode, setSortMode] = useState<SortMode>('default')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = resources
    .filter((r) => {
      if (filterType !== 'all' && r.type !== filterType) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortMode === 'type') return a.type.localeCompare(b.type)
      if (sortMode === 'difficulty') {
        const order = { Facile: 1, Moyen: 2, Difficile: 3 }
        return (
          (order[a.difficulty as keyof typeof order] || 0) -
          (order[b.difficulty as keyof typeof order] || 0)
        )
      }
      return 0
    })

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'video', label: 'Vidéos' },
    { key: 'article', label: 'Articles' },
    { key: 'exercice', label: 'Exercices' },
    { key: 'projet', label: 'Projets' },
  ]

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une ressource..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Sort */}
        <button
          onClick={() =>
            setSortMode((prev) =>
              prev === 'default' ? 'type' : prev === 'type' ? 'difficulty' : 'default'
            )
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
        >
          <SortAsc className="w-4 h-4" />
          <span className="text-sm font-medium">
            {sortMode === 'default' ? 'Défaut' : sortMode === 'type' ? 'Type' : 'Difficulté'}
          </span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((btn) => (
          <motion.button
            key={btn.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterType(btn.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterType === btn.key
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>

      {/* Resources */}
      {filtered.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${filterType}-${sortMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filtered.map((resource, index) =>
              viewMode === 'grid' ? (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onToggleComplete={onToggleComplete}
                  delay={index * 0.05}
                />
              ) : (
                <ListItem
                  key={resource.id}
                  resource={resource}
                  onToggleComplete={onToggleComplete}
                  delay={index * 0.05}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <Card className="p-12 text-center">
          <CardBody>
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Aucune ressource trouvée
            </h3>
            <p className="text-slate-400">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

function ListItem({
  resource,
  onToggleComplete,
  delay,
}: {
  resource: Resource
  onToggleComplete?: (id: string) => void
  delay: number
}) {
  const typeIcons = {
    video: '🎬',
    article: '📄',
    exercice: '✏️',
    projet: '🛠️',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card hover className="flex items-center gap-4 p-4">
        <div className="text-2xl flex-shrink-0">{typeIcons[resource.type]}</div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold truncate ${
              resource.completed ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {resource.title}
          </h4>
          <p className="text-sm text-slate-500 truncate">
            {resource.description}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-400">{resource.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {resource.difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {onToggleComplete && (
            <button
              onClick={() => onToggleComplete(resource.id)}
              className={`p-2 rounded-lg transition-colors ${
                resource.completed
                  ? 'text-emerald-500 hover:bg-emerald-50'
                  : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              {resource.completed ? '✓' : '○'}
            </button>
          )}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
          </a>
        </div>
      </Card>
    </motion.div>
  )
}
