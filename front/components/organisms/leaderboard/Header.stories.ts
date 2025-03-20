import type { Meta, StoryObj } from '@storybook/vue3'
import component from './Header.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
