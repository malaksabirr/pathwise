import api from './api'
import type { QuizQuestion, QuizResult } from '../context/AppContext'

export interface AnswerInput {
  questionId: string
  selectedOption: number
  timeSpent: number
}

// Cache du quiz en cours (pour soumettre les réponses)
let currentQuizId: string | null = null
let currentSubject: string = 'python'
let currentLevel: string = 'debutant'

export async function fetchQuizQuestions(
  profileId: string,
  topic?: string
): Promise<QuizQuestion[]> {
  // Récupère subject/level depuis localStorage (stocké après onboarding)
  const subject = topic?.toLowerCase().replace(/\s+/g, '_') ||
    localStorage.getItem('pw_subject') || 'python'
  const level = localStorage.getItem('pw_level') || 'debutant'

  currentSubject = subject
  currentLevel = level

  const { data } = await api.get('/quiz', {
    params: { subject, level },
  })

  // Stocke l'id du quiz pour la soumission
  currentQuizId = data.id

  // Adapte le format backend → format attendu par le frontend
  return data.questions.map((q: {
    id: string
    text: string
    options: string[]
    correctIndex: number
    explanation: string
  }) => ({
    id: q.id,
    question: q.text,
    options: q.options,
    correctAnswer: q.correctIndex,
    explanation: q.explanation,
  }))
}

export async function submitAnswers(payload: {
  profileId: string
  answers: AnswerInput[]
}): Promise<QuizResult> {
  if (!currentQuizId) {
    throw new Error('Aucun quiz en cours. Relance le quiz.')
  }

  // Adapte le format frontend → backend
  const backendAnswers = payload.answers.map((a) => ({
    questionId: a.questionId,
    selectedIndex: a.selectedOption,
  }))

  const { data } = await api.post('/quiz/answers', {
    quizId: currentQuizId,
    answers: backendAnswers,
  })

  // Adapte la réponse backend → format attendu par le frontend
  return {
    score: data.score,
    total: data.total,
    percentage: data.percentage,
    answers: payload.answers.map((a) => a.selectedOption),
    recommendations: data.nextLevel
      ? [`Tu peux passer au niveau ${data.nextLevel} ! 🎉`]
      : ['Continue à t\'entraîner sur ce niveau 💪'],
  }
}