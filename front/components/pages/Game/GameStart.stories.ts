import type { Meta, StoryObj } from '@storybook/vue3'
import GameStart from './GameStart.vue'

const meta = {
  component: GameStart,
} satisfies Meta<typeof GameStart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onComplete: () => console.log('onComplete'),
  },
}
