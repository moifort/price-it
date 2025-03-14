import type { Meta, StoryObj } from '@storybook/vue3'
import MyNuxtWelcome from './MyWelcome.vue'

const meta = {
  component: MyNuxtWelcome,
} satisfies Meta<typeof MyNuxtWelcome>

export default meta
type Story = StoryObj<typeof meta>

export const NuxtWelcomeStory: Story = {
  args: {},
}
