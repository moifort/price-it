import type { Meta, StoryObj } from '@storybook/react'
import { ResultOverlay } from './ResultOverlay'

const meta = {
  component: ResultOverlay,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ResultOverlay>

export default meta
type Story = StoryObj<typeof meta>

const baseArgs = {
  product: {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    price: 299.99,
  },
  runsLeft: 5,
  onNext: () => console.log('Next clicked'),
}

export const Correct: Story = {
  args: {
    ...baseArgs,
    gameState: 'guessed',
    isCorrect: true,
  },
}

export const Wrong: Story = {
  args: {
    ...baseArgs,
    gameState: 'guessed',
    isCorrect: false,
  },
}

export const Timeout: Story = {
  args: {
    ...baseArgs,
    gameState: 'timeout',
    isCorrect: null,
  },
}

export const LastRun: Story = {
  args: {
    ...baseArgs,
    gameState: 'guessed',
    isCorrect: true,
    runsLeft: 1,
  },
}

export const Hidden: Story = {
  args: {
    ...baseArgs,
    gameState: 'playing',
    isCorrect: null,
  },
}
