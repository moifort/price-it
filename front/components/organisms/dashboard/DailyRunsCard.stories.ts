import type { Meta, StoryObj } from '@storybook/vue3'
import DailyRunsCard from './DailyRunsCard.vue'

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
