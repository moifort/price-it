import type { Meta, StoryObj } from '@storybook/vue3'
import component from './Timer.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    timer: 10,
  },
}

export const Warning: Story = {
  args: {
    timer: 5,
  },
}

export const Danger: Story = {
  args: {
    timer: 3,
  },
}
