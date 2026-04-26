import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Lock,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { AdminDashboard } from '../components/admin/AdminDashboard'

export function AdminPage() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Simple auth check - in production, use proper authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('pathwise_admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo password - in production, use proper backend auth
    if (password === 'admin') {
      setIsAuthenticated(true)
      sessionStorage.setItem('pathwise_admin_auth', 'true')
      setError('')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800">PathWise</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-medium text-indigo-700">Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  Espace Administrateur
                </h1>
                <p className="text-slate-500">
                  Veuillez vous authentifier pour accéder au dashboard HITL.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="••••••"
                    autoFocus
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow"
                >
                  Se connecter
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                Demo : mot de passe = "admin"
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AdminDashboard />
          </motion.div>
        )}
      </main>
    </div>
  )
}
