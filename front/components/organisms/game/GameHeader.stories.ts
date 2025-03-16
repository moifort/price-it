import type { Meta, StoryObj } from '@storybook/vue3'
import GameHeader from './GameHeader.vue'

const meta = {
  title: 'Organisms/Game/GameHeader',
  component: GameHeader,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GameHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 5,
    runsLeft: 7,
    onExit: () => console.log('Exit game clicked'),
  },
}

export const HighScore: Story = {
  args: {
    score: 42,
    runsLeft: 3,
    onExit: () => console.log('Exit game clicked'),
  },
}

export const LastRun: Story = {
  args: {
    score: 9,
    runsLeft: 1,
    onExit: () => console.log('Exit game clicked'),
  },
} 