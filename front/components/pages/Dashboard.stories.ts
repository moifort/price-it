import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Score } from '../../../back/src/score/validators'
import { Seconde } from '../../../back/src/utils/validators'
import Component from './Dashboard.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(3984),
    totalRun: Run(10),
    remainingRun: Run(2),
    runRenewAt: new Date('2026-12-31T23:59:59'),
    timeLimit: Seconde(8),
    runBonus: Run(10),
    timeBonus: Seconde(10),
  },
}
