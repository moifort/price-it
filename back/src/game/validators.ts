import { z } from 'zod'

const validUserGuesses = ['less', 'exact', 'more'] as const
export const UserGuess = (value: unknown) =>
  z
    .enum(validUserGuesses, {
      errorMap: () => ({ message: `UserGuess must be one of: ${validUserGuesses.join(', ')}. Received: ${value}` }),
    })
    .parse(value)
