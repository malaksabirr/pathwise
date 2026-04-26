export function formatScore(score: number, total: number): string {
  return `${score} / ${total}`
}

export function formatPercentage(score: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((score / total) * 100)}%`
}

export function getGradeLabel(percentage: number): string {
  if (percentage >= 90) return 'Excellent'
  if (percentage >= 75) return 'Très bien'
  if (percentage >= 60) return 'Bien'
  if (percentage >= 50) return 'Passable'
  return 'À retravailler'
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90) return 'text-emerald-500'
  if (percentage >= 75) return 'text-teal-500'
  if (percentage >= 60) return 'text-cyan-500'
  if (percentage >= 50) return 'text-amber-500'
  return 'text-rose-500'
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}
