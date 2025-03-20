import type { Meta, StoryObj } from '@storybook/vue3'
import Loading from './Loading.vue'

const meta = { component: Loading } satisfies Meta<typeof Loading>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
