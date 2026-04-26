import { useState, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import {
  submitProfile as submitProfileApi,
  updateProfile as updateProfileApi,
  type ProfileInput,
} from '../services/profileService'

export function useProfile() {
  const { state, dispatch } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitProfile = useCallback(
    async (input: ProfileInput) => {
      setIsSubmitting(true)
      dispatch({ type: 'SET_ERROR', payload: null })
      try {
        const result = await submitProfileApi(input)

        dispatch({ type: 'SET_PROFILE', payload: result.profile })
        dispatch({
          type: 'SET_LEVEL',
          payload: {
            level: result.level.level,
            score: result.level.score,
            description: result.level.description,
            color:
              result.level.level === 'debutant'
                ? 'sky'
                : result.level.level === 'intermediaire'
                  ? 'indigo'
                  : 'teal',
          },
        })

        // Stocke subject + level pour le quiz
        const subject = input.topics[0]?.toLowerCase().replace(/\s+/g, '_') || 'python'
        localStorage.setItem('pw_subject', subject)
        localStorage.setItem('pw_level', result.level.level)

        dispatch({ type: 'SET_STEP', payload: 1 })
        return result
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Erreur lors de l'envoi du profil"
        dispatch({ type: 'SET_ERROR', payload: message })
        throw err
      } finally {
        setIsSubmitting(false)
      }
    },
    [dispatch]
  )

  const updateProfile = useCallback(
    async (id: string, updates: Partial<ProfileInput>) => {
      dispatch({ type: 'SET_ERROR', payload: null })
      try {
        const profile = await updateProfileApi(id, updates)
        dispatch({ type: 'SET_PROFILE', payload: profile })
        return profile
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Erreur lors de la mise à jour'
        dispatch({ type: 'SET_ERROR', payload: message })
        throw err
      }
    },
    [dispatch]
  )

  return {
    profile: state.profile,
    level: state.level,
    isSubmitting,
    error: state.error,
    submitProfile,
    updateProfile,
  }
}