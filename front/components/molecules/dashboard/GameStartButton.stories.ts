import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './GameStartButton.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
