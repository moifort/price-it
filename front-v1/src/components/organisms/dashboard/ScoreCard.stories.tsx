import type { Meta, StoryObj } from '@storybook/react'
import type { Score } from '../../../../../back/src/score/types'
import { ScoreCard } from './ScoreCard'

const meta = {
  component: ScoreCard,
} satisfies Meta<typeof ScoreCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { score: 0 as Score },
}
