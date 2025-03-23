import type { Meta, StoryObj } from '@storybook/vue3'
import { Point, Score } from '../../../../back/src/score/validators'
import { ProductId } from '../../../../back/src/shop-product/validators'
import { Minute, Quantity } from '../../../../back/src/utils/validators'
import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: ProductId('product-1'),
    quantity: Quantity(5),
    period: Minute(30),
    amount: Point(1000),
    score: Score(5000),
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}

export const AllTime: Story = {
  args: {
    ...Default.args,
    quantity: Quantity(100),
    period: 'all-time' as const,
    amount: Point(10000),
    score: Score(10000),
  },
}

export const noFund: Story = {
  args: {
    ...Default.args,
    quantity: Quantity(100),
    amount: Point(50000),
    score: Score(5000),
  },
}
