import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  FileCheck,
  Filter,
} from 'lucide-react'
import { Card, CardHeader, CardBody } from '../common/Card'
import { ResourceValidator } from './ResourceValidator'
import { useApp } from '../../context/AppContext'
import * as adminService from '../../services/adminService'

export function AdminDashboard() {
  const { state, dispatch } = useApp()
  const [stats, setStats] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    weeklySubmissions: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [resourcesData, statsData] = await Promise.all([
        adminService.fetchPendingResources(),
        adminService.getStats(),
      ])
      dispatch({ type: 'SET_PENDING_RESOURCES', payload: resourcesData })
      setStats(statsData)
    } catch (err) {
      console.error('Failed to load admin data:', err)
      // Use mock data for demo
      const mockResources = [
        {
          id: '1',
          title: 'Introduction à React Hooks',
          description: 'Un guide complet sur les hooks React avec exemples pratiques',
          type: 'article',
          source: 'Web Search',
          submittedAt: new Date().toISOString(),
          status: 'pending' as const,
        },
        {
          id: '2',
          title: 'Python Data Science Masterclass',
          description: 'Cours vidéo avancé sur la data science avec Python',
          type: 'video',
          source: 'RAG Pipeline',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending' as const,
        },
        {
          id: '3',
          title: 'Exercices CSS Grid',
          description: 'Série d\'exercices pour maîtriser CSS Grid Layout',
          type: 'exercice',
          source: 'LLM Generation',
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          status: 'pending' as const,
        },
      ]
      dispatch({ type: 'SET_PENDING_RESOURCES', payload: mockResources })
      setStats({
        totalPending: 3,
        totalApproved: 12,
        totalRejected: 4,
        weeklySubmissions: 8,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const updated = await adminService.approveResource(id)
      dispatch({ type: 'UPDATE_PENDING_RESOURCE', payload: updated })
      setStats((prev) => ({
        ...prev,
        totalPending: Math.max(0, prev.totalPending - 1),
        totalApproved: prev.totalApproved + 1,
      }))
    } catch {
      // Mock update
      dispatch({
        type: 'UPDATE_PENDING_RESOURCE',
        payload: {
          ...state.pendingResources.find((r) => r.id === id)!,
          status: 'approved',
        },
      })
      setStats((prev) => ({
        ...prev,
        totalPending: Math.max(0, prev.totalPending - 1),
        totalApproved: prev.totalApproved + 1,
      }))
    }
  }

  const handleReject = async (id: string, reason: string) => {
    try {
      const updated = await adminService.rejectResource(id, reason)
      dispatch({ type: 'UPDATE_PENDING_RESOURCE', payload: updated })
      setStats((prev) => ({
        ...prev,
        totalPending: Math.max(0, prev.totalPending - 1),
        totalRejected: prev.totalRejected + 1,
      }))
    } catch {
      dispatch({
        type: 'UPDATE_PENDING_RESOURCE',
        payload: {
          ...state.pendingResources.find((r) => r.id === id)!,
          status: 'rejected',
        },
      })
      setStats((prev) => ({
        ...prev,
        totalPending: Math.max(0, prev.totalPending - 1),
        totalRejected: prev.totalRejected + 1,
      }))
    }
  }

  const filteredResources = state.pendingResources.filter((r) =>
    filter === 'all' ? true : r.status === filter
  )

  const statCards = [
    {
      label: 'En attente',
      value: stats.totalPending,
      icon: Inbox,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Approuvés',
      value: stats.totalApproved,
      icon: CheckCircle2,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Rejetés',
      value: stats.totalRejected,
      icon: XCircle,
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
    },
    {
      label: 'Cette semaine',
      value: stats.weeklySubmissions,
      icon: TrendingUp,
      color: 'from-indigo-400 to-cyan-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Validation HITL
              </h1>
              <p className="text-sm text-slate-500">
                Supervisez et validez les ressources générées par l'IA
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
          <Users className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-700">
            Mode Administrateur
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <motion.div
                    className="text-2xl font-bold text-slate-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="w-4 h-4 text-slate-400" />
        {[
          { key: 'pending' as const, label: 'En attente', icon: Clock },
          { key: 'approved' as const, label: 'Approuvés', icon: CheckCircle2 },
          { key: 'rejected' as const, label: 'Rejetés', icon: XCircle },
          { key: 'all' as const, label: 'Tous', icon: FileCheck },
        ].map((f) => (
          <motion.button
            key={f.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <f.icon className="w-4 h-4" />
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Resources List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full"
          />
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="space-y-4">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ResourceValidator
                resource={resource}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody className="text-center py-12">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Tout est à jour !
            </h3>
            <p className="text-slate-500">
              Aucune ressource en attente de validation
            </p>
          </CardBody>
        </Card>
      )}

      {/* Activity Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-800">Activité récente</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-end gap-2 h-32">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500 to-cyan-400"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
