export type Level = 'debutant' | 'intermediaire' | 'avance'

export interface LevelConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
  description: string
}

export const levelConfigs: Record<Level, LevelConfig> = {
  debutant: {
    label: 'Débutant',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    icon: '🌱',
    description: 'Vous débutez dans ce domaine. Pas d\'inquiétude, nous allons construire vos bases ensemble !',
  },
  intermediaire: {
    label: 'Intermédiaire',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    icon: '🚀',
    description: 'Vous avez déjà les bases. Il est temps d\'approfondir et de monter en compétences !',
  },
  avance: {
    label: 'Avancé',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    icon: '💎',
    description: 'Vous maîtrisez déjà beaucoup d\'aspects. Concentrons-nous sur les points experts !',
  },
}

export function getLevelFromScore(score: number): Level {
  if (score <= 33) return 'debutant'
  if (score <= 66) return 'intermediaire'
  return 'avance'
}

export function getLevelConfig(level: Level): LevelConfig {
  return levelConfigs[level]
}

export function getProgressForLevel(level: Level): number {
  switch (level) {
    case 'debutant': return 33
    case 'intermediaire': return 66
    case 'avance': return 100
  }
}

export function getNextLevel(current: Level): Level | null {
  switch (current) {
    case 'debutant': return 'intermediaire'
    case 'intermediaire': return 'avance'
    case 'avance': return null
  }
}

export function getLevelProgressLabel(current: Level): string {
  const next = getNextLevel(current)
  if (!next) return 'Niveau maximum atteint ! 🎉'
  return `Prochain objectif : ${levelConfigs[next].label}`
}
