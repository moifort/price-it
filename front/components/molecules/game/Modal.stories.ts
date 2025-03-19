import type { Meta, StoryObj } from '@storybook/vue3'
import { Trophy } from 'lucide-vue-next'
import { Amount, Url } from '../../../../back/src/utils/validators'
import component from './Modal.vue'

const meta = {
  component,
  decorators: [() => ({ template: '<div style="height: 330px; position: relative;"><story /></div>' })],
  render: (args) => ({
    components: { Modal: component, Trophy },
    setup: () => ({ args }),
    template: `
      <Modal v-bind="args">
        <template #icon>
            <Trophy class="h-12 w-12 text-yellow-500" />
        </template>
        
        <template #title>
         <div class="text-yellow-500">You Won!</div>
        </template>
      </Modal>
    `,
  }),
} satisfies Meta<typeof component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: Amount(89),
    productLink: Url('https://example.com/product'),
  },
}
