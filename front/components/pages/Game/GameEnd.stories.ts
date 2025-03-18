import type { Meta, StoryObj } from '@storybook/vue3'
import GameEnd from './GameEnd.vue'

const meta = {
  component: GameEnd,
} satisfies Meta<typeof GameEnd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 1250,
    onPlayAgain: () => console.log('onPlayAgain'),
  },
}

export const HighScore: Story = {
  args: {
    score: 9850,
    onPlayAgain: () => console.log('onPlayAgain'),
  },
}
