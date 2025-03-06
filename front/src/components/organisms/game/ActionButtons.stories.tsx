import type { Meta, StoryObj } from '@storybook/react'
import { ActionButtons } from './ActionButtons'

const meta = {
  component: ActionButtons,
} satisfies Meta<typeof ActionButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Playing: Story = {
  args: {
    gameState: 'playing',
    onGuess: (guess) => console.log(`User guessed: ${guess}`),
  },
}

export const Disabled: Story = {
  args: {
    gameState: 'guessed',
    onGuess: (guess) => console.log(`User guessed: ${guess}`),
  },
}

export const Timeout: Story = {
  args: {
    gameState: 'timeout',
    onGuess: (guess) => console.log(`User guessed: ${guess}`),
  },
}
