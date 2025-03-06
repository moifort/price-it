import type { Meta, StoryObj } from '@storybook/react'
import { GameTemplate } from './Game'

const meta = {
  component: GameTemplate,
} satisfies Meta<typeof GameTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: <div>Game Header</div>,
    content: <div>Game Content</div>,
    overlay: <div>Game Overlay</div>,
  },
}

export const WithoutOverlay: Story = {
  args: {
    header: <div>Game Header</div>,
    content: <div>Game Content</div>,
  },
}
