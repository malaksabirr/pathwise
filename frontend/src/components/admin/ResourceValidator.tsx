import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Bot,
  Globe,
  Database,
} from 'lucide-react'
import { Card, CardBody } from '../common/Card'
import { Button } from '../common/Button'
import { Badge } from '../common/Badge'
import type { PendingResource } from '../../context/AppContext'

interface ResourceValidatorProps {
  resource: PendingResource
  onApprove: (id: string) => void
  onReject: (id: string, reason: string) => void
}

const sourceConfig = {
  'Web Search': { icon: Globe, color: 'text-sky-600 bg-sky-50' },
  'RAG Pipeline': { icon: Database, color: 'text-indigo-600 bg-indigo-50' },
  'LLM Generation': { icon: Bot, color: 'text-violet-600 bg-violet-50' },
}

const typeIcons: Record<string, string> = {
  video: '🎬',
  article: '📄',
  exercice: '✏️',
  projet: '🛠️',
}

export function ResourceValidator({
  resource,
  onApprove,
  onReject,
}: ResourceValidatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [actionTaken, setActionTaken] = useState(false)

  const handleApprove = () => {
    setActionTaken(true)
    onApprove(resource.id)
  }

  const handleReject = () => {
    if (!rejectReason.trim()) return
    setActionTaken(true)
    onReject(resource.id, rejectReason)
  }

  const source = sourceConfig[resource.source as keyof typeof sourceConfig] || {
    icon: Bot,
    color: 'text-slate-600 bg-slate-50',
  }
  const SourceIcon = source.icon

  const statusConfig = {
    pending: { label: 'En attente', variant: 'warning' as const },
    approved: { label: 'Approuvé', variant: 'success' as const },
    rejected: { label: 'Rejeté', variant: 'error' as const },
  }

  if (actionTaken && resource.status !== 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card
          className={`border-l-4 ${
            resource.status === 'approved'
              ? 'border-l-emerald-500'
              : 'border-l-rose-500'
          }`}
        >
          <CardBody className="flex items-center gap-4 py-4">
            {resource.status === 'approved' ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-500" />
            )}
            <div>
              <p className="font-semibold text-slate-800">
                {resource.title}
              </p>
              <p className="text-sm text-slate-500">
                Ressource {resource.status === 'approved' ? 'approuvée' : 'rejetée'}
              </p>
            </div>
            <Badge variant={statusConfig[resource.status].variant} className="ml-auto">
              {statusConfig[resource.status].label}
            </Badge>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <Card
      className={`border-l-4 ${
        resource.status === 'pending'
          ? 'border-l-amber-400'
          : resource.status === 'approved'
            ? 'border-l-emerald-500'
            : 'border-l-rose-500'
      }`}
    >
      <CardBody className="py-4">
        {/* Main Row */}
        <div className="flex items-start gap-4">
          {/* Type Icon */}
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0">
            {typeIcons[resource.type] || '📚'}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-slate-800 truncate">
                {resource.title}
              </h4>
              <Badge variant={statusConfig[resource.status].variant} size="sm">
                {statusConfig[resource.status].label}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mb-2 line-clamp-2">
              {resource.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${source.color}`}
              >
                <SourceIcon className="w-3 h-3" />
                {resource.source}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3" />
                {new Date(resource.submittedAt).toLocaleDateString('fr-FR')}
              </span>
              <span className="text-slate-400 capitalize">{resource.type}</span>
            </div>
          </div>

          {/* Actions */}
          {resource.status === 'pending' && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleApprove}
                className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                title="Approuver"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowRejectForm(true)}
                className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
                title="Rejeter"
              >
                <XCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          )}
        </div>

        {/* Reject Form */}
        <AnimatePresence>
          {showRejectForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-100">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span className="text-sm font-semibold text-rose-700">
                    Motif du rejet
                  </span>
                </div>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Pourquoi rejetez-vous cette ressource ?"
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none resize-none text-sm"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    onClick={() => setShowRejectForm(false)}
                    variant="ghost"
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="danger"
                    size="sm"
                    disabled={!rejectReason.trim()}
                  >
                    Confirmer le rejet
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">ID :</span>
                    <span className="ml-2 font-mono text-slate-600">
                      {resource.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Source :</span>
                    <span className="ml-2 text-slate-600">
                      {resource.source}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Soumis le :</span>
                    <span className="ml-2 text-slate-600">
                      {new Date(resource.submittedAt).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Type :</span>
                    <span className="ml-2 capitalize text-slate-600">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                    Voir la ressource
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Ajouter un commentaire
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardBody>
    </Card>
  )
}
