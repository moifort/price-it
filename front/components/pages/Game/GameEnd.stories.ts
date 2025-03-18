import type { Meta, StoryObj } from '@storybook/vue3'
import { Score } from '../../../../back/src/score/validators'
import GameEnd from './GameEnd.vue'

const meta = {
  component: GameEnd,
} satisfies Meta<typeof GameEnd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(1250),
    'onClick:exit': () => console.log('onClick:exit'),
  },
}
