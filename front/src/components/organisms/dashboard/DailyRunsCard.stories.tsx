import type { Meta, StoryObj } from '@storybook/react'
import { DailyRunsCard } from './DailyRunsCard'

const meta = {
  component: DailyRunsCard,
} satisfies Meta<typeof DailyRunsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    current: 5,
    total: 10,
  },
}
