import type { Meta, StoryObj } from '@storybook/vue3'
import { Score } from '../../../../back/src/score/validators'
import { ProductId } from '../../../../back/src/shop-product/validators'
import { TelegramStar } from '../../../../back/src/utils/telegram/validators'
import { Minute, Quantity } from '../../../../back/src/utils/validators'
import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Run: Story = {
  args: {
    id: ProductId('product-1'),
    quantity: Quantity(5),
    period: Minute(30),
    amount: TelegramStar(100),
    score: Score(5000),
    category: 'run' as const,
    buy: async () => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}

export const RunAllTime: Story = {
  args: {
    ...Run.args,
    quantity: Quantity(100),
    period: 'all-time' as const,
    amount: TelegramStar(100),
    category: 'run' as const,
    score: Score(10000),
  },
}

export const Booster: Story = {
  args: {
    ...Run.args,
    quantity: Quantity(100),
    amount: TelegramStar(500),
    category: 'score' as const,
    score: Score(5000),
  },
}

export const Disabled: Story = {
  args: {
    ...Run.args,
    quantity: Quantity(100),
    amount: TelegramStar(500),
    category: 'score' as const,
    score: Score(5000),
    disabled: true,
  },
}
