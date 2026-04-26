import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import type { QuizResult } from '../context/AppContext'
import {
  fetchQuizQuestions as fetchQuizQuestionsApi,
  submitAnswers as submitAnswersApi,
  type AnswerInput,
} from '../services/quizService'

export function useQuiz() {
  const { state, dispatch } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AnswerInput[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchQuestions = useCallback(
    async (profileId: string, topic?: string) => {
      setIsLoading(true)
      dispatch({ type: 'SET_ERROR', payload: null })
      try {
        const questions = await fetchQuizQuestionsApi(profileId, topic)
        dispatch({ type: 'SET_QUIZ_QUESTIONS', payload: questions })
        setCurrentQuestion(0)
        setAnswers([])
        return questions
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement du quiz'
        dispatch({ type: 'SET_ERROR', payload: message })
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch]
  )

  const answerQuestion = useCallback(
    (questionId: string, selectedOption: number, timeSpent: number) => {
      const answer: AnswerInput = { questionId, selectedOption, timeSpent }
      setAnswers((prev) => [...prev, answer])
      setCurrentQuestion((prev) => prev + 1)
    },
    []
  )

  const submitQuiz = useCallback(
    async (profileId: string) => {
      setIsLoading(true)
      dispatch({ type: 'SET_ERROR', payload: null })
      try {
        const result = await submitAnswersApi({
          profileId,
          answers,
        })
        dispatch({ type: 'SET_QUIZ_RESULT', payload: result })
        dispatch({ type: 'SET_STEP', payload: 5 })
        return result
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Erreur lors de la soumission'
        dispatch({ type: 'SET_ERROR', payload: message })
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, answers]
  )

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers([])
    dispatch({ type: 'SET_QUIZ_QUESTIONS', payload: [] })
    dispatch({ type: 'SET_QUIZ_RESULT', payload: null })
  }, [dispatch])

  return {
    questions: state.quizQuestions,
    currentQuestion,
    totalQuestions: state.quizQuestions.length,
    answers,
    result: state.quizResult as QuizResult | null,
    isLoading,
    error: state.error,
    fetchQuestions,
    answerQuestion,
    submitQuiz,
    resetQuiz,
  }
}
