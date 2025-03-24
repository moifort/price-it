import type { Meta, StoryObj } from '@storybook/vue3'
import { Score } from '../../../back/src/score/validators'
import { Rank } from '../../../back/src/utils/validators'
import component from './Leaderboard.vue'

const meta: Meta<typeof component> = { component }
export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {
  args: {
    topPlayers: [
      { name: 'kungfux010', score: Score(76605), rank: Rank(1) },
      { name: 'Mpodif', score: Score(64972), rank: Rank(2) },
      { name: 'Николай', score: Score(38654), rank: Rank(3) },
      { name: 'Darya', score: Score(16906), rank: Rank(4) },
      { name: 'Player5', score: Score(13130), rank: Rank(5) },
      { name: 'Player6', score: Score(12511), rank: Rank(6) },
      { name: 'Аня', score: Score(9838), rank: Rank(7) },
    ],
  },
}

export const Loading: Story = {
  args: { topPlayers: [] },
}
