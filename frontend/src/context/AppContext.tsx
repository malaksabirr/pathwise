import React, { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'

export interface Profile {
  name: string
  email: string
  goal: string
  experience: string
  topics: string[]
  timePerWeek: number
  preferredFormat: string
}

export interface LevelInfo {
  level: 'debutant' | 'intermediaire' | 'avance'
  score: number
  description: string
  color: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'video' | 'article' | 'exercice' | 'projet'
  url: string
  duration: string
  difficulty: string
  completed: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizResult {
  score: number
  total: number
  percentage: number
  answers: number[]
  recommendations: string[]
}

export interface PendingResource {
  id: string
  title: string
  description: string
  type: string
  source: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface AppState {
  profile: Profile | null
  level: LevelInfo | null
  resources: Resource[]
  quizQuestions: QuizQuestion[]
  quizResult: QuizResult | null
  pendingResources: PendingResource[]
  currentStep: number
  isLoading: boolean
  error: string | null
}

type AppAction =
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'SET_LEVEL'; payload: LevelInfo }
  | { type: 'SET_RESOURCES'; payload: Resource[] }
  | { type: 'UPDATE_RESOURCE'; payload: Resource }
  | { type: 'SET_QUIZ_QUESTIONS'; payload: QuizQuestion[] }
  | { type: 'SET_QUIZ_RESULT'; payload: QuizResult | null }
  | { type: 'SET_PENDING_RESOURCES'; payload: PendingResource[] }
  | { type: 'UPDATE_PENDING_RESOURCE'; payload: PendingResource }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

const initialState: AppState = {
  profile: null,
  level: null,
  resources: [],
  quizQuestions: [],
  quizResult: null,
  pendingResources: [],
  currentStep: 0,
  isLoading: false,
  error: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload }
    case 'SET_LEVEL':
      return { ...state, level: action.payload }
    case 'SET_RESOURCES':
      return { ...state, resources: action.payload }
    case 'UPDATE_RESOURCE':
      return {
        ...state,
        resources: state.resources.map(r =>
          r.id === action.payload.id ? action.payload : r
        ),
      }
    case 'SET_QUIZ_QUESTIONS':
      return { ...state, quizQuestions: action.payload }
    case 'SET_QUIZ_RESULT':
      return { ...state, quizResult: action.payload }
    case 'SET_PENDING_RESOURCES':
      return { ...state, pendingResources: action.payload }
    case 'UPDATE_PENDING_RESOURCE':
      return {
        ...state,
        pendingResources: state.pendingResources.map(r =>
          r.id === action.payload.id ? action.payload : r
        ),
      }
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
