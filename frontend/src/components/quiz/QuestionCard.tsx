import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertCircle, HelpCircle } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../common/Card'
import type { QuizQuestion } from '../../context/AppContext'

interface QuestionCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  onAnswer: (selectedOption: number) => void
  timeLimit?: number
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeLimit = 60,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (selected === null) onAnswer(-1)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  })

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    setTimeout(() => onAnswer(index), 500)
  }

  const progress = ((questionNumber - 1) / totalQuestions) * 100
  const timeProgress = (timeLeft / timeLimit) * 100
  const isTimeLow = timeLeft <= 10

  const optionLabels = ['A', 'B', 'C', 'D']
  const optionColors = [
    'from-rose-400 to-pink-500',
    'from-sky-400 to-blue-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-600">
              Question {questionNumber}/{totalQuestions}
            </span>
          </div>
          <motion.div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isTimeLow
                ? 'bg-rose-50 text-rose-600 animate-pulse'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-bold">{timeLeft}s</span>
          </motion.div>
        </div>

        {/* Question Progress */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Timer Bar */}
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isTimeLow
                ? 'bg-gradient-to-r from-rose-400 to-red-500'
                : 'bg-gradient-to-r from-emerald-400 to-teal-500'
            }`}
            animate={{ width: `${timeProgress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Card glow>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {questionNumber}
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-relaxed">
                {question.question}
              </h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={selected === null ? { scale: 1.02 } : {}}
                  whileTap={selected === null ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(index)}
                  disabled={selected !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selected === index
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                      : selected !== null
                        ? 'border-slate-100 opacity-60'
                        : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${optionColors[index]} flex items-center justify-center text-white font-bold flex-shrink-0`}
                    >
                      {optionLabels[index]}
                    </div>
                    <span className="font-medium text-slate-700">{option}</span>
                    {selected === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center gap-2 text-sm text-slate-400 justify-center"
      >
        <AlertCircle className="w-4 h-4" />
        <span>Cliquez sur la réponse de votre choix</span>
      </motion.div>
    </div>
  )
}
