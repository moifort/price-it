import type { Meta, StoryObj } from '@storybook/react'
import { GameStartButton } from './GameStartButton'

const meta = {
  component: GameStartButton,
} satisfies Meta<typeof GameStartButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClick: () => console.log('clicked'),
  },
}
