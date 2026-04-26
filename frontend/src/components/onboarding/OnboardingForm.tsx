import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Target,
  Clock,
  BookOpen,
  Layers,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react'
import { Button } from '../common/Button'
import { Badge } from '../common/Badge'
import { useProfile } from '../../hooks/useProfile'
import type { ProfileInput } from '../../services/profileService'

const goals = [
  {
    id: 'career',
    label: 'Changer de carrière',
    icon: '🎯',
    desc: 'Transition vers un nouveau domaine',
  },
  {
    id: 'skills',
    label: 'Monter en compétences',
    icon: '📈',
    desc: 'Approfondir mes connaissances actuelles',
  },
  {
    id: 'project',
    label: 'Réaliser un projet',
    icon: '🚀',
    desc: 'Acquérir les skills pour un projet concret',
  },
  {
    id: 'curiosity',
    label: 'Par curiosité',
    icon: '🔍',
    desc: 'Explorer de nouveaux horizons',
  },
]

const experiences = [
  { id: 'none', label: 'Aucune', desc: 'Je débute complètement' },
  { id: 'basic', label: 'Basique', desc: "Quelques notions d'école" },
  { id: 'intermediate', label: 'Intermédiaire', desc: 'Déjà quelques projets' },
  { id: 'advanced', label: 'Avancée', desc: 'Je veux devenir expert' },
]

const formats = [
  { id: 'video', label: 'Vidéos', icon: '🎬' },
  { id: 'article', label: 'Articles', icon: '📄' },
  { id: 'interactive', label: 'Interactif', icon: '🎮' },
  { id: 'project', label: 'Projets', icon: '🛠️' },
]

const topicSuggestions = [
  'JavaScript',
  'Python',
  'React',
  'Machine Learning',
  'Data Science',
  'DevOps',
  'UX/UI Design',
  'Cybersécurité',
  'Cloud Computing',
  'Mobile',
  'Backend',
  'Frontend',
]

export function OnboardingForm() {
  const { submitProfile, isSubmitting } = useProfile()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<ProfileInput>({
    name: '',
    email: '',
    goal: '',
    experience: '',
    topics: [],
    timePerWeek: 5,
    preferredFormat: '',
  })
  const [topicInput, setTopicInput] = useState('')

  const addTopic = (topic: string) => {
    if (topic && !form.topics.includes(topic)) {
      setForm((prev) => ({ ...prev, topics: [...prev.topics, topic] }))
    }
    setTopicInput('')
  }

  const removeTopic = (topic: string) => {
    setForm((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }))
  }

  const handleSubmit = async () => {
    await submitProfile(form)
  }

  const steps = [
    {
      title: 'Vos informations',
      subtitle: 'Commençons par apprendre à nous connaître',
      icon: User,
    },
    {
      title: 'Votre objectif',
      subtitle: 'Quel est votre motivation principale ?',
      icon: Target,
    },
    {
      title: 'Votre niveau',
      subtitle: 'Où en êtes-vous actuellement ?',
      icon: Layers,
    },
    {
      title: 'Vos sujets',
      subtitle: 'Quels domaines souhaitez-vous explorer ?',
      icon: BookOpen,
    },
    {
      title: 'Vos préférences',
      subtitle: 'Comment préférez-vous apprendre ?',
      icon: Clock,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((_s, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  i <= step
                    ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
                animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </motion.div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    i < step
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-lg font-bold text-slate-800">
            {steps[step].title}
          </h3>
          <p className="text-slate-500">{steps[step].subtitle}</p>
        </motion.div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-soft border border-slate-100 p-8"
        >
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, goal: goal.id }))
                  }
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    form.goal === goal.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="font-semibold text-slate-800">
                    {goal.label}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {goal.desc}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="space-y-3">
              {experiences.map((exp) => (
                <motion.button
                  key={exp.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, experience: exp.id }))
                  }
                  className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${
                    form.experience === exp.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      form.experience === exp.id
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {exp.label[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      {exp.label}
                    </div>
                    <div className="text-sm text-slate-500">{exp.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Step 3: Topics */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ajoutez des sujets qui vous intéressent
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && addTopic(topicInput)
                    }
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Tapez un sujet et appuyez sur Entrée..."
                  />
                  <Button
                    onClick={() => addTopic(topicInput)}
                    variant="primary"
                    size="md"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Suggestions :
                </p>
                <div className="flex flex-wrap gap-2">
                  {topicSuggestions.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => addTopic(topic)}
                      disabled={form.topics.includes(topic)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        form.topics.includes(topic)
                          ? 'bg-indigo-100 text-indigo-700 cursor-default'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {topic}
                      {form.topics.includes(topic) && (
                        <Check className="inline w-3 h-3 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {form.topics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm font-semibold text-slate-600 mb-3">
                    Vos sujets sélectionnés ({form.topics.length}) :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="info"
                        className="cursor-pointer"
                      >
                        <span className="flex items-center gap-1">
                          {topic}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeTopic(topic)
                            }}
                          >
                            ×
                          </button>
                        </span>
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 4: Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Format de contenu préféré
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {formats.map((format) => (
                    <motion.button
                      key={format.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          preferredFormat: format.id,
                        }))
                      }
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        form.preferredFormat === format.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="text-2xl mb-1">{format.icon}</div>
                      <div className="font-medium text-slate-700">
                        {format.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Temps disponible par semaine
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={form.timePerWeek}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        timePerWeek: parseInt(e.target.value),
                      }))
                    }
                    className="flex-1 accent-indigo-500"
                  />
                  <span className="text-lg font-bold text-indigo-600 min-w-[80px]">
                    {form.timePerWeek}h
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1h</span>
                  <span>20h</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          variant="ghost"
          disabled={step === 0}
        >
          Retour
        </Button>
        {step < steps.length - 1 ? (
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            icon={<ChevronRight className="w-5 h-5" />}
          >
            Continuer
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            variant="secondary"
            icon={<Sparkles className="w-5 h-5" />}
          >
            Générer mon parcours
          </Button>
        )}
      </div>
    </div>
  )
}
