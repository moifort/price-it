import type { Meta, StoryObj } from '@storybook/vue3'
import { Score } from '../../../../back/src/score/validators'
import component from './Table.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    players: [
      { name: 'kungfux010', score: Score(76605), rank: 1 },
      { name: 'NextOrders', score: Score(64972), rank: 2 },
      { name: 'Николай', score: Score(38654), rank: 3 },
      { name: 'Darya', score: Score(16906), rank: 4 },
      { name: 'Player5', score: Score(13130), rank: 5 },
      { name: 'Player6', score: Score(12511), rank: 6 },
      { name: 'Аня', score: Score(9838), rank: 7 },
    ],
  },
}
