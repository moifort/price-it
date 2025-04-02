import type { Meta, StoryObj } from '@storybook/vue3'
import { Point, Score } from '../../../../back/src/score/validators'
import ScoreCard from './ScoreCard.vue'

const meta = {
  component: ScoreCard,
} satisfies Meta<typeof ScoreCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(100),
    winBonus: Point(10),
    winExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  },
}

export const LessOneMinuteBonus: Story = {
  args: {
    ...Default.args,
    winExpiredAt: new Date(Date.now() + 1000 * 29),
  },
}
