import type { Meta, StoryObj } from '@storybook/vue3'
import Game from './Game.vue'

const meta = {
  title: 'Pages/Game',
  component: Game,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Game>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onNavigateHome: () => console.log('Navigate home clicked'),
  },
} 