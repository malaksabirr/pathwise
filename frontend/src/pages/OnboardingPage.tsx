import { motion } from 'framer-motion'
import { UserCircle, Sparkles, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { OnboardingForm } from '../components/onboarding/OnboardingForm'
import { LevelDetector } from '../components/onboarding/LevelDetector'
import { UserHeader } from '../components/layout/UserHeader'
import { useApp } from '../context/AppContext'
import { Loader } from '../components/common/Loader'

export function OnboardingPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <UserHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {!state.level ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200"
              >
                <UserCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Créez votre profil
              </h1>
              <p className="text-slate-500">
                Ces informations nous permettront de créer un parcours
                parfaitement adapté à vos besoins.
              </p>
            </div>

            {state.isLoading ? (
              <div className="flex justify-center py-20">
                <Loader text="Analyse de votre profil..." />
              </div>
            ) : (
              <OnboardingForm />
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 mb-4"
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">
                  Analyse complète
                </span>
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Votre niveau détecté
              </h1>
              <p className="text-slate-500">
                Basé sur votre profil, voici notre analyse. Un quiz rapide va
                maintenant confirmer votre niveau ! 🎯
              </p>
            </div>

            <LevelDetector />

            {/* ← Redirige vers /quiz au lieu de /learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-400 text-sm mb-4">
                Un quiz rapide va affiner votre parcours
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-shadow"
              >
                Passer le quiz d'évaluation
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}