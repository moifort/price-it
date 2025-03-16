import type { Meta, StoryObj } from '@storybook/vue3'
import GameTimer from './GameTimer.vue'

const meta = {
  title: 'Organisms/Game/GameTimer',
  component: GameTimer,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GameTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    timer: 10,
  },
}

export const Warning: Story = {
  args: {
    timer: 5,
  },
}

export const Danger: Story = {
  args: {
    timer: 3,
  },
} 