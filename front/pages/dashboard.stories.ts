import type { Meta, StoryObj } from '@storybook/vue3'
import {} from 'msw'
import Dashboard from './dashboard.vue'

const meta = {
  component: Dashboard,
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
