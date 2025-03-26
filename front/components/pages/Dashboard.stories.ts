import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Point, Score } from '../../../back/src/score/validators'
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
    runRenewAt: new Date(),
    timeLimit: Seconde(8),
    runBonus: Run(10),
    winBonus: Point(10),
    'onClick:startGame': () => console.log('onClick:startGame'),
    'onClick:buyRuns': () => console.log('onClick:buyRuns'),
    'onClick:buyWin': () => console.log('onClick:buyWin'),
  },
}

export const NoMoreRun: Story = {
  args: {
    ...Default.args,
    remainingRun: Run(0),
  },
}
