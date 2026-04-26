import { motion } from 'framer-motion'
import {
  Brain,
  Sparkles,
  Users,
  Zap,
  ArrowRight,
  BookOpen,
  Target,
  TrendingUp,
  Shield,
  Play,
  CheckCircle2,
  Globe,
  Lock,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '../components/common/Button'
import { Card, CardBody } from '../components/common/Card'

export function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Brain,
      title: 'IA Multi-Agent',
      description:
        'Notre système utilise 4 agents spécialisés pour analyser, rechercher, évaluer et adapter votre parcours en temps réel.',
      color: 'from-indigo-400 to-violet-500',
    },
    {
      icon: Target,
      title: 'Profilage intelligent',
      description:
        'Un questionnaire rapide permet à notre IA de déterminer précisément votre niveau et vos objectifs d\'apprentissage.',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: BookOpen,
      title: 'Contenu personnalisé',
      description:
        'Chaque ressource est sélectionnée et générée spécifiquement pour vous, selon votre niveau et votre rythme.',
      color: 'from-teal-400 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Progression adaptative',
      description:
        'Votre parcours évolue avec vous. Les quiz continus permettent d\'affiner constamment les recommandations.',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Validation humaine (HITL)',
      description:
        'Chaque ressource est vérifiée par nos experts avant d\'être intégrée à votre parcours, garantissant la qualité.',
      color: 'from-rose-400 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Apprentissage accéléré',
      description:
        'Grâce à la personnalisation fine, progressez jusqu\'à 3x plus vite qu\'avec les méthodes traditionnelles.',
      color: 'from-violet-400 to-purple-500',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Créez votre profil',
      description: 'Répondez à quelques questions sur vos objectifs et votre expérience.',
    },
    {
      number: '02',
      title: 'Détection du niveau',
      description: 'Notre IA analyse vos réponses pour déterminer votre niveau exact.',
    },
    {
      number: '03',
      title: 'Parcours généré',
      description: 'Recevez un parcours personnalisé avec des ressources adaptées.',
    },
    {
      number: '04',
      title: 'Quiz & Évaluation',
      description: 'Testez vos connaissances pour affiner continuellement votre parcours.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Illustration */}
      <section className="relative overflow-hidden pt-12 pb-20">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top Bar - Logo only, no admin button */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800">PathWise</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">FR</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-700">
                  Propulsé par l'IA Multi-Agent
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-slate-800">Votre parcours</span>
                <br />
                <span className="text-gradient">d'apprentissage</span>
                <br />
                <span className="text-slate-800">sur mesure</span>
              </h1>

              <p className="text-lg text-slate-500 max-w-lg mb-8 leading-relaxed">
                PathWise utilise l'intelligence artificielle pour créer un parcours
                d'apprentissage 100% adapté à votre niveau, vos objectifs et votre
                rythme.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/onboarding')}
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Commencer gratuitement
                </Button>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="inline-flex items-center gap-2 px-6 py-4 text-slate-600 font-semibold hover:text-indigo-600 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                    <Play className="w-4 h-4 text-indigo-500 ml-0.5" />
                  </div>
                  Voir la démo
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-300 to-cyan-300 flex items-center justify-center text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <strong>4.9/5</strong> sur 2,000+ avis
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/50 via-cyan-200/50 to-teal-200/50 rounded-3xl blur-2xl transform scale-95" />
                <img
                  src="/hero-illustration.png"
                  alt="PathWise - Apprentissage personnalisé avec IA"
                  className="relative w-full rounded-3xl shadow-2xl shadow-indigo-100/50"
                />
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">+50 XP</div>
                    <div className="text-[10px] text-slate-500">Module terminé</div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">IA Active</div>
                    <div className="text-[10px] text-slate-500">4 agents en cours</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { value: '10K+', label: 'Apprenants' },
              { value: '50K+', label: 'Ressources' },
              { value: '4', label: 'Agents IA' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Un processus simple et efficace pour créer votre parcours
              personnalisé en quelques minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-slate-100 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Une technologie de pointe
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Notre système multi-agent combine les meilleures technologies pour
              un apprentissage optimal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <CardBody>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ils nous font confiance
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sophie L.',
                role: 'Développeuse Web',
                text: "PathWise a complètement transformé ma façon d'apprendre. J'ai progressé 3x plus vite qu'avant !",
                rating: 5,
              },
              {
                name: 'Marc D.',
                role: 'Data Scientist',
                text: 'Le système de quiz est incroyable. Il détecte exactement mes points faibles et m\'aide à les renforcer.',
                rating: 5,
              },
              {
                name: 'Amina K.',
                role: 'Étudiante',
                text: 'Je recommande PathWise à tous mes amis. Le parcours est vraiment personnalisé et les ressources sont top.',
                rating: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardBody>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-cyan-300 flex items-center justify-center text-white font-bold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {review.name}
                        </div>
                        <div className="text-xs text-slate-500">{review.role}</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card glow className="text-center py-16">
              <CardBody>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 mb-6">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-700">
                    Rejoignez 10,000+ apprenants
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                  Prêt à commencer votre
                  <br />
                  <span className="text-gradient">voyage d'apprentissage ?</span>
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto mb-8">
                  Créez votre profil en 2 minutes et recevez un parcours
                  personnalisé adapté à vos objectifs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/onboarding')}
                    size="lg"
                    icon={<Zap className="w-5 h-5" />}
                  >
                    Créer mon parcours
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Gratuit
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Sans carte bancaire
                  </span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Données sécurisées
                  </span>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-800">PathWise</span>
              </div>
              <p className="text-sm text-slate-500">
                Système multi-agent de personnalisation de parcours d'apprentissage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Produit</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => navigate('/onboarding')} className="hover:text-indigo-600 transition-colors">Profil</button></li>
                <li><button onClick={() => navigate('/learning')} className="hover:text-indigo-600 transition-colors">Parcours</button></li>
                <li><button onClick={() => navigate('/quiz')} className="hover:text-indigo-600 transition-colors">Quiz</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Ressources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Légal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
            PathWise  2026. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
