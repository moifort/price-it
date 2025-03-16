import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import Game from './Game.vue'
import { Button } from '~/components/atoms/button'

const meta = {
  title: 'Templates/Game',
  component: Game,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Game>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: h('div', { class: 'flex justify-between items-center' }, [
      h(Button, { variant: 'outline' }, 'Back'),
      h('div', { class: 'font-bold' }, 'Score: 5'),
    ]),
    content: h('div', { class: 'space-y-4' }, [
      h('div', { class: 'bg-card p-4 rounded-lg text-center' }, 'Timer: 10'),
      h('div', { class: 'bg-card p-4 rounded-lg h-64 flex items-center justify-center' }, 'Product Card'),
      h('div', { class: 'bg-card p-4 rounded-lg text-center' }, 'Action Buttons'),
    ]),
  },
}

export const WithOverlay: Story = {
  args: {
    ...Default.args,
    overlay: h('div', { class: 'fixed inset-0 bg-black/50 flex items-center justify-center' }, [
      h('div', { class: 'bg-card p-6 rounded-lg max-w-md w-full text-center' }, [
        h('h2', { class: 'text-xl font-bold' }, 'Game Overlay'),
        h('p', { class: 'mt-2' }, 'This is an overlay that appears during gameplay'),
      ]),
    ]),
  },
} 