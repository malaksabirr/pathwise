import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  BookOpen,
  Trophy,
  Zap,
  Sparkles,
  Flame,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useNavigate, useLocation } from 'react-router'

interface UserHeaderProps {
  showNav?: boolean
}

export function UserHeader({ showNav = true }: UserHeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useApp()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const userName = state.profile?.name || 'Apprenant'
  const userLevel = state.level?.level === 'avance' ? 3 : state.level?.level === 'intermediaire' ? 2 : 1
  const xp = state.quizResult ? state.quizResult.score * 50 : 0

  const navItems = [
    { path: '/', label: 'Accueil', icon: Sparkles },
    { path: '/onboarding', label: 'Profil', icon: User },
    { path: '/learning', label: 'Parcours', icon: BookOpen },
    { path: '/quiz', label: 'Quiz', icon: Zap },
    { path: '/results', label: 'Progrès', icon: Trophy },
  ]

  const notifications = [
    { id: 1, text: 'Nouveau module disponible !', time: '2 min', unread: true },
    { id: 2, text: 'Vous avez gagné 50 XP', time: '1h', unread: true },
    { id: 3, text: 'Rappel : Quiz quotidien', time: '3h', unread: false },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800 hidden sm:block">
            PathWise
          </span>
        </button>

        {/* Navigation */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-indigo-50 rounded-xl border border-indigo-100"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* XP Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold text-amber-700">{xp} XP</span>
          </div>

          {/* Streak */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-bold text-rose-700">3j</span>
          </div>

          {/* Level Badge */}
          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200">
            <Trophy className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-bold text-indigo-700">Niv. {userLevel}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen)
                setDropdownOpen(false)
              }}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Notifications</span>
                      <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">
                        Tout marquer lu
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                            notif.unread ? 'bg-indigo-50/30' : ''
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notif.unread ? 'bg-indigo-500' : 'bg-slate-300'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700">{notif.text}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen)
                setNotifOpen(false)
              }}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <img
                src="/avatar-default.png"
                alt={userName}
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100"
              />
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-slate-800 leading-tight">
                  {userName}
                </div>
                <div className="text-xs text-slate-400 leading-tight">
                  Niveau {userLevel}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                  >
                    {/* User info */}
                    <div className="px-4 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img
                          src="/avatar-default.png"
                          alt={userName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                        />
                        <div>
                          <div className="font-semibold text-slate-800">
                            {userName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {state.profile?.email || 'apprenant@pathwise.fr'}
                          </div>
                        </div>
                      </div>
                      {/* Progress mini */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Progression</span>
                          <span className="font-medium text-indigo-600">65%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-[65%] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      {[
                        { icon: User, label: 'Mon profil', action: () => navigate('/onboarding') },
                        { icon: BookOpen, label: 'Mon parcours', action: () => navigate('/learning') },
                        { icon: Trophy, label: 'Mes progrès', action: () => navigate('/results') },
                        { icon: Settings, label: 'Paramètres', action: () => {} },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            item.action()
                            setDropdownOpen(false)
                          }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 py-2">
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          navigate('/')
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {showNav && (
        <div className="md:hidden border-t border-slate-100 overflow-x-auto">
          <div className="flex px-4 py-2 gap-1 min-w-max">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      : 'text-slate-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
