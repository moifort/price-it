import type { Meta, StoryObj } from '@storybook/vue3'
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
    totalRun: 10,
    remainingRun: 2,
    bestTime: Seconde(8),
  },
}
