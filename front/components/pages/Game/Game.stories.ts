import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../../back/src/run/validators'
import { Score } from '../../../../back/src/score/validators'
import Component from './Game.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(1500),
    runsLeft: Run(5),
    'onClick:exit': () => console.log('onClick:exit'),
  },
}
