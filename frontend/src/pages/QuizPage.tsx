import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { QuizPlayer } from '../components/quiz/QuizPlayer'
import { ScoreBoard } from '../components/quiz/ScoreBoard'
import { UserHeader } from '../components/layout/UserHeader'
import { useApp } from '../context/AppContext'
import { useQuiz } from '../hooks/useQuiz'

export function QuizPage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { result, resetQuiz } = useQuiz()

  const profileId = state.profile?.email || 'demo-user'

  useEffect(() => {
    resetQuiz()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <UserHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {!result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Welcome */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800"
              >
                Quiz d'évaluation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 mt-1"
              >
                {state.profile?.name
                  ? `Bon courage ${state.profile.name} !`
                  : 'Testez vos connaissances pour affiner votre parcours.'}
              </motion.p>
            </div>

            <QuizPlayer profileId={profileId} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">
                Vos résultats
              </h1>
              <p className="text-slate-500 mt-1">
                Voici ce que nous avons appris de vos réponses
              </p>
            </div>

            <ScoreBoard
              result={result}
              onRetry={() => {
                resetQuiz()
                window.location.reload()
              }}
              onContinue={() => navigate('/learning')}
            />
          </motion.div>
        )}
      </main>
    </div>
  )
}
