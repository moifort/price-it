import type { Meta, StoryObj } from '@storybook/react'
import { GameTimer } from './GameTimer'

const meta = {
  component: GameTimer,
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

export const Critical: Story = {
  args: {
    timer: 2,
  },
}
