import { Routes, Route } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { LearningPage } from './pages/LearningPage'
import { QuizPage } from './pages/QuizPage'
import { ResultsPage } from './pages/ResultsPage'
import { AdminPage } from './pages/AdminPage'

// Flow : / → /onboarding → /quiz → /learning → /results

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App