import { GameTemplate } from '@/components/templates/Game'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: GameTemplate,
} satisfies Meta<typeof GameTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between border-2 border-dashed border-gray-400 p-4 relative w-full">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">header slot</span>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Game Title</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Score: 1000</span>
        </div>
      </div>
    ),
    content: (
      <div className="border-2 border-dashed border-gray-400 p-4 relative w-full min-h-[400px] flex items-center justify-center">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">content slot</span>
        <div className="text-center">
          <p className="text-xl">Main Game Content Area</p>
          <p className="text-sm text-muted-foreground">Interactive game elements go here</p>
        </div>
      </div>
    ),
    overlay: (
      <div className="border-2 border-dashed border-gray-400 p-4 relative w-full max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">overlay slot</span>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-4">Game Overlay</h3>
          <p>Pause menu, victory screen, or instructions would appear here</p>
        </div>
      </div>
    ),
  },
}
