import type { Meta, StoryObj } from '@storybook/react'
import type { Score } from '../../../../../back/src/score/types'
import { GameHeader } from './GameHeader'

const meta = {
  component: GameHeader,
} satisfies Meta<typeof GameHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 5 as Score,
    runsLeft: 7,
    onExit: () => console.log('Exit clicked'),
  },
}

export const HighScore: Story = {
  args: {
    score: 15 as Score,
    runsLeft: 3,
    onExit: () => console.log('Exit clicked'),
  },
}

export const LastRun: Story = {
  args: {
    score: 9 as Score,
    runsLeft: 1,
    onExit: () => console.log('Exit clicked'),
  },
}
