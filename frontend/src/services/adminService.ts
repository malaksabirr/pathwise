import api from './api'
import type { PendingResource } from '../context/AppContext'

export async function fetchPendingResources(): Promise<PendingResource[]> {
  const { data } = await api.get('/admin/pending')
  return data.resources
}

export async function approveResource(
  resourceId: string,
  notes?: string
): Promise<PendingResource> {
  const { data } = await api.post(`/admin/approve/${resourceId}`, { notes })
  return data
}

export async function rejectResource(
  resourceId: string,
  reason: string
): Promise<PendingResource> {
  const { data } = await api.post(`/admin/reject/${resourceId}`, { reason })
  return data
}

export async function getStats(): Promise<{
  totalPending: number
  totalApproved: number
  totalRejected: number
  weeklySubmissions: number
}> {
  const { data } = await api.get('/admin/stats')
  return data
}
