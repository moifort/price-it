import type { Meta, StoryObj } from '@storybook/vue3'
import { ShopProductId } from '../../../../back/src/shop/validators'
import { Quantity } from '../../../../back/src/utils/validators'
import component from './Ticket.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: ShopProductId('product-1'),
    quantity: Quantity(10000),
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}
