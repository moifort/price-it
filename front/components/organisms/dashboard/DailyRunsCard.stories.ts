import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../../back/src/run/validators'
import DailyRunsCard from './DailyRunsCard.vue'

const meta = {
  component: DailyRunsCard,
} satisfies Meta<typeof DailyRunsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    current: Run(5),
    total: Run(10),
    renewAt: new Date(),
    bonus: Run(0),
  },
}

export const NoTurnsRemaining: Story = {
  args: {
    ...Default.args,
    current: Run(0),
  },
}
