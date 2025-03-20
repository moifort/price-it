import type { Meta, StoryObj } from '@storybook/vue3'
import { Point } from '../../../../back/src/score/validators'
import { ShopProductId } from '../../../../back/src/shop/validators'
import { Minute, Quantity } from '../../../../back/src/utils/validators'
import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: ShopProductId('product-1'),
    quantity: Quantity(5),
    period: Minute(30),
    amount: Point(1000),
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}

export const Unlimited: Story = {
  args: {
    ...Default.args,
    quantity: Quantity(100),
    period: 'all-time' as const,
    amount: Point(50000),
  },
}
