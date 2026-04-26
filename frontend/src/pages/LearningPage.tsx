import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Map,
  LayoutGrid,
  RotateCcw,
  Zap,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { LearningPath } from '../components/learning/LearningPath'
import { ResourceList } from '../components/learning/ResourceList'
import { UserHeader } from '../components/layout/UserHeader'
import { CompletionModal } from '../components/animations/CompletionModal'
import { Celebration } from '../components/animations/Celebration'
import { useApp } from '../context/AppContext'
import { Loader } from '../components/common/Loader'

export function LearningPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [view, setView] = useState<'path' | 'list'>('path')
  const [isLoading, setIsLoading] = useState(true)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [completedModule, setCompletedModule] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockResources = [
        {
          id: '1',
          title: 'Introduction aux fondamentaux',
          description: 'Apprenez les concepts de base indispensables pour bien démarrer.',
          type: 'video' as const,
          url: '#',
          duration: '15 min',
          difficulty: 'Facile',
          completed: true,
        },
        {
          id: '2',
          title: 'Guide pratique étape par étape',
          description: 'Un article détaillé pour mettre en pratique vos connaissances.',
          type: 'article' as const,
          url: '#',
          duration: '10 min',
          difficulty: 'Facile',
          completed: true,
        },
        {
          id: '3',
          title: 'Exercices pratiques #1',
          description: 'Testez vos connaissances avec ces exercices interactifs.',
          type: 'exercice' as const,
          url: '#',
          duration: '20 min',
          difficulty: 'Moyen',
          completed: false,
        },
        {
          id: '4',
          title: 'Projet : Construire votre première application',
          description: 'Mettez tout en pratique avec ce projet guidé complet.',
          type: 'projet' as const,
          url: '#',
          duration: '2h',
          difficulty: 'Moyen',
          completed: false,
        },
        {
          id: '5',
          title: 'Concepts avancés expliqués simplement',
          description: 'Passez au niveau supérieur avec ces concepts avancés.',
          type: 'video' as const,
          url: '#',
          duration: '25 min',
          difficulty: 'Difficile',
          completed: false,
        },
        {
          id: '6',
          title: 'Exercices pratiques #2',
          description: 'Des exercices plus challenging pour consolider vos acquis.',
          type: 'exercice' as const,
          url: '#',
          duration: '30 min',
          difficulty: 'Difficile',
          completed: false,
        },
      ]
      dispatch({ type: 'SET_RESOURCES', payload: mockResources })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [dispatch])

  const toggleComplete = (id: string) => {
    const resource = state.resources.find((r) => r.id === id)
    if (resource) {
      const newCompleted = !resource.completed
      dispatch({
        type: 'UPDATE_RESOURCE',
        payload: { ...resource, completed: newCompleted },
      })
      // Trigger celebration when completing
      if (newCompleted && !resource.completed) {
        setCompletedModule(resource.title)
        setShowCelebration(true)
        setTimeout(() => {
          setShowCelebration(false)
          setShowCompletion(true)
        }, 2500)
      }
    }
  }

  const completedCount = state.resources.filter((r) => r.completed).length
  const totalResources = state.resources.length
  const progress = totalResources > 0 ? (completedCount / totalResources) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <UserHeader />

      {/* Celebration overlay */}
      <Celebration
        show={showCelebration}
        onComplete={() => {
          setShowCelebration(false)
          setShowCompletion(true)
        }}
        message="Module complété !"
        submessage={`Vous avez terminé : ${completedModule}`}
      />

      {/* Completion Modal (Duolingo style) */}
      <CompletionModal
        show={showCompletion}
        onClose={() => setShowCompletion(false)}
        moduleName={completedModule}
        xp={50}
        nextModule={state.resources.find((r) => !r.completed)?.title || 'Prochain module'}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader text="Génération de votre parcours..." size="lg" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-slate-400 max-w-md text-center"
            >
              Notre système multi-agent analyse votre profil et sélectionne les
              meilleures ressources pour vous...
            </motion.p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Welcome message with user name */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800"
              >
                Bon retour, {state.profile?.name || 'Apprenant'} !
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 mt-1"
              >
                Continuez votre parcours d'apprentissage personnalisé.
              </motion.p>
            </div>

            {/* Hero Card with progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-indigo-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium text-white/80">
                    Votre progression
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-1">
                  {completedCount}/{totalResources} modules complétés
                </h2>
                <p className="text-white/80 text-sm mb-4">
                  {Math.round(progress)}% de votre parcours accompli
                </p>
                <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* View Toggle + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-bold text-slate-800">
                Votre parcours
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setView('path')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === 'path'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    Parcours
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === 'list'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Liste
                  </button>
                </div>
                <button
                  onClick={() => setIsLoading(true)}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                  title="Régénérer le parcours"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            {view === 'path' ? (
              <LearningPath
                resources={state.resources}
                onSelectResource={(r) => console.log('Selected:', r)}
              />
            ) : (
              <ResourceList
                resources={state.resources}
                onToggleComplete={toggleComplete}
              />
            )}

            {/* Quiz CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="bg-gradient-to-r from-indigo-50 via-cyan-50 to-teal-50 rounded-2xl p-8 border border-indigo-100">
                <Zap className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Tester vos connaissances
                </h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Passez un rapide quiz pour que nous puissions affiner votre
                  parcours et vous proposer du contenu encore plus adapté.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow"
                >
                  Lancer le quiz
                  <Zap className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
