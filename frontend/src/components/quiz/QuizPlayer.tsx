import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Trophy, Zap } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../common/Button'
import { QuestionCard } from './QuestionCard'
import { useQuiz } from '../../hooks/useQuiz'
import { useApp } from '../../context/AppContext'

interface QuizPlayerProps {
  profileId: string
}

export function QuizPlayer({ profileId }: QuizPlayerProps) {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const {
    questions,
    currentQuestion,
    totalQuestions,
    fetchQuestions,
    answerQuestion,
    submitQuiz,
    isLoading,
    result,
  } = useQuiz()

  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const startTimeRef = useRef<number>(0)

  const startQuiz = useCallback(async () => {
    await fetchQuestions(profileId)
    setQuizStarted(true)
    setQuizFinished(false)
    startTimeRef.current = Date.now()
  }, [fetchQuestions, profileId])

  const handleAnswer = useCallback(
    (selectedOption: number) => {
      const currentQ = questions[currentQuestion]
      if (!currentQ) return

      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      answerQuestion(currentQ.id, selectedOption, timeSpent)
      startTimeRef.current = Date.now()

      if (currentQuestion + 1 >= totalQuestions) {
        setTimeout(async () => {
          const quizResult = await submitQuiz(profileId)
          setQuizFinished(true)

          // Met à jour le niveau dans le context selon le score
          if (quizResult) {
            const pct = Math.round((quizResult.score / quizResult.total) * 100)
            const newLevel =
              pct >= 75 ? 'avance' : pct >= 45 ? 'intermediaire' : 'debutant'

            // Met à jour le niveau détecté
            dispatch({
              type: 'SET_LEVEL',
              payload: {
                level: newLevel,
                score: pct,
                description: `Niveau ${newLevel} confirmé par le quiz (${pct}%)`,
                color:
                  newLevel === 'debutant'
                    ? 'sky'
                    : newLevel === 'intermediaire'
                      ? 'indigo'
                      : 'teal',
              },
            })

            // Stocke le niveau pour le parcours
            localStorage.setItem('pw_level', newLevel)

            // Redirige vers le parcours adapté après 2s
            setTimeout(() => {
              navigate('/learning')
            }, 2000)
          }
        }, 800)
      }
    },
    [questions, currentQuestion, totalQuestions, answerQuestion, submitQuiz, profileId, dispatch, navigate]
  )

  const resetQuiz = useCallback(() => {
    setQuizStarted(false)
    setQuizFinished(false)
  }, [])

  // Start Screen
  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Évaluation rapide
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Répondez à quelques questions pour que nous puissions construire
            votre parcours parfaitement adapté à votre niveau réel.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Questions', value: '~5' },
              { label: 'Durée', value: '~3 min' },
              { label: 'Type', value: 'QCM' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="text-xl font-bold text-indigo-600">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <Button
            onClick={startQuiz}
            loading={isLoading}
            size="lg"
            icon={<Play className="w-5 h-5" />}
          >
            Commencer le quiz
          </Button>
        </div>
      </motion.div>
    )
  }

  // Loading
  if (isLoading && questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500"
          />
          <p className="text-slate-500">Génération du quiz par IA...</p>
        </div>
      </div>
    )
  }

  // Quiz terminé → redirection automatique vers /learning
  if (quizFinished && result) {
    const pct = Math.round((result.score / result.total) * 100)
    const newLevel =
      pct >= 75 ? 'Avancé' : pct >= 45 ? 'Intermédiaire' : 'Débutant'

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Quiz terminé ! 🎉
          </h2>
          <p className="text-slate-600 text-lg font-semibold mb-1">
            Score : {result.score}/{result.total} ({pct}%)
          </p>
          <p className="text-slate-500 mb-6">
            Niveau détecté : <span className="font-bold text-indigo-600">{newLevel}</span>
            <br />
            Génération de ton parcours adapté...
          </p>

          {/* Barre de chargement animée */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          <Button
            onClick={resetQuiz}
            variant="outline"
            size="sm"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Recommencer le quiz
          </Button>
        </div>
      </motion.div>
    )
  }

  // Active Quiz
  return (
    <AnimatePresence mode="wait">
      {questions[currentQuestion] && (
        <QuestionCard
          key={questions[currentQuestion].id}
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
        />
      )}
    </AnimatePresence>
  )
}