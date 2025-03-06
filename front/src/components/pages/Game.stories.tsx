import type { Meta, StoryObj } from '@storybook/react'
import { Game } from './Game'

const meta = {
  component: Game,
  parameters: {
    layout: 'fullscreen',
    // This ensures Storybook knows we're using the app directory structure
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Game>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onNavigateHome: () => console.log('Navigating to home'),
  },
}
