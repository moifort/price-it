import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './Counter.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 100,
  },
}

export const SlowAnimation: Story = {
  args: {
    value: 100,
    duration: 3,
  },
}
