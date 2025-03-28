import type { Media as MediaType } from './types'

export const Media = (value: unknown): MediaType => {
  const validMediaTypes: MediaType[] = ['telegram', 'youtube']
  if (typeof value !== 'string' || !validMediaTypes.includes(value as MediaType)) {
    throw new Error(`Media must be one of: ${validMediaTypes.join(', ')}. Received: ${value}`)
  }
  return value as MediaType
}
