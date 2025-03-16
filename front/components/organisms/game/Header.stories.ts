import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../../back/src/run/validators'
import { Score } from '../../../../back/src/score/validators'
import Header from './Header.vue'

const meta = { component: Header } satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(5),
    runsLeft: Run(7),
    'onClick:exit': () => console.log('exit'),
  },
}

export const HighScore: Story = {
  args: {
    ...Default.args,
    score: Score(4280),
  },
}

export const LastRun: Story = {
  args: {
    ...Default.args,
    runsLeft: Run(1),
  },
}
