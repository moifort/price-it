import type { Meta, StoryObj } from '@storybook/vue3'
import { Loader2 } from 'lucide-vue-next'
import Loading from './Loading.vue'

const meta = {
  component: Loading,
  render: (args) => ({
    components: { Loading, Loader2 },
    setup: () => ({ args }),
    template: `
      <Loading>
          <Loader2 class="h-8 w-8 animate-spin text-primary" />
      </Loading>
    `,
  }),
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
