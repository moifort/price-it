import type { Meta, StoryObj } from '@storybook/vue3'
import { ProductId } from '../../../../back/src/shop-product/validators'
import { Quantity } from '../../../../back/src/utils/validators'
import component from './Ticket.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: ProductId('product-1'),
    quantity: Quantity(10000),
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}
