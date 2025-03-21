import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Point, Score } from '../../../back/src/score/validators'
import { ShopProductId } from '../../../back/src/shop/validators'
import { Minute, Quantity } from '../../../back/src/utils/validators'
import component from './Shop.vue'

const meta: Meta<typeof component> = { component }
export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {
  args: {
    score: Score(60000),
    runsLeft: Run(10),
    products: [
      {
        id: ShopProductId('shop-product-5-run-60-minutes'),
        amount: Point(10000),
        period: Minute(60),
        quantity: Quantity(5),
      },
      {
        id: ShopProductId('shop-product-5-run-all-time'),
        amount: Point(50000),
        period: 'all-time' as const,
        quantity: Quantity(5),
      },
      {
        id: ShopProductId('shop-product-10-run-60-minutes'),
        amount: Point(17000),
        period: Minute(60),
        quantity: Quantity(10),
      },
      {
        id: ShopProductId('shop-product-10-run-all-time'),
        amount: Point(70000),
        period: 'all-time' as const,
        quantity: Quantity(10),
      },
      {
        id: ShopProductId('shop-product-20-run-all-time'),
        amount: Point(100000),
        period: 'all-time' as const,
        quantity: Quantity(20),
      },
    ],
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
    buyPoints: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}

export const NoFund: Story = {
  args: {
    ...Default.args,
    score: Score(0),
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
  },
}
