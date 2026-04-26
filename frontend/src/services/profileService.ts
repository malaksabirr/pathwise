import api from './api'
import type { Profile } from '../context/AppContext'

export interface ProfileInput {
  name: string
  email: string
  goal: string
  experience: string
  topics: string[]
  timePerWeek: number
  preferredFormat: string
}

export interface LevelOutput {
  level: 'debutant' | 'intermediaire' | 'avance'
  score: number
  description: string
  analysis: string
}

export async function submitProfile(input: ProfileInput): Promise<{
  profile: Profile
  level: LevelOutput
}> {
  // Adapte le format frontend → backend FastAPI
  const backendPayload = {
    name: input.name,
    email: input.email,
    subject: input.topics[0]?.toLowerCase().replace(/\s+/g, '_') || 'python',
    goal: input.goal,
    hoursPerWeek: input.timePerWeek,
    experience: input.experience,
  }

  const { data } = await api.post('/profile', backendPayload)

  // Adapte la réponse backend → format attendu par le frontend
  return {
    profile: {
      name: input.name,
      email: input.email,
      goal: input.goal,
      experience: input.experience,
      topics: input.topics,
      timePerWeek: input.timePerWeek,
      preferredFormat: input.preferredFormat,
    },
    level: {
      level: data.level.level,
      score: data.level.score,
      description: data.level.explanation,
      analysis: data.level.explanation,
    },
  }
}

export async function getProfile(id: string): Promise<Profile> {
  const { data } = await api.get(`/profile/${id}`)
  return data
}

export async function updateProfile(
  id: string,
  updates: Partial<ProfileInput>
): Promise<Profile> {
  const { data } = await api.patch(`/profile/${id}`, updates)
  return data
}