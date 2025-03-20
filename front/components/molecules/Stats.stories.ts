import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Score } from '../../../back/src/score/validators'
import component from './Stats.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(19800),
    runsLeft: Run(5),
  },
}
