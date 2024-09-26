import { z } from 'zod'

export const employmentDocumentTypes = [
  'employment contract',
  'offer letter',
  'termination letter',
  'performance review',
  'pay slip',
  'other'
] as const

export const employmentDocumentTypesSchema = z.enum([
  'employment contract',
  'offer letter',
  'termination letter',
  'performance review',
  'pay slip',
  'other'
])

export const employmentDocumentTypeColors = [
  'indigo',
  'green',
  'yellow',
  'purple',
  'blue',
  'gray'
] as const

// Start of Selection
export const employmentDocumentTypeColorMap = Object.fromEntries(
  employmentDocumentTypes.map((type, index) => [
    type,
    employmentDocumentTypeColors[index]
  ])
)
