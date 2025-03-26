import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Score } from '../../../back/src/score/validators'
import component from './Tasks.vue'

const meta: Meta<typeof component> = { component }
export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {
  args: {
    score: Score(60000),
    runsLeft: Run(10),
    friends: 3,
    'onClick:invite': () => console.log('onClick:invite'),
  },
}
