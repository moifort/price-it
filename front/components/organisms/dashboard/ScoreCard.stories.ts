import type { Meta, StoryObj } from '@storybook/vue3'
import ScoreCard from './ScoreCard.vue'

const meta = {
  component: ScoreCard,
} satisfies Meta<typeof ScoreCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 100,
  },
}
