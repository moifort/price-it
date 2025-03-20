import type { Meta, StoryObj } from '@storybook/vue3'
import component from './Shop.vue'

const meta: Meta<typeof component> = { component }
export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {
  args: {
    products: [
      {
        id: 'shop-product-5-run-60-minutes',
        name: '5 runs 60 minutes',
        description: 'Unlock 5 runs NOW during 60 minutes. Increase your chance to win more points',
        category: 'run',
        amount: 10000,
        period: 60,
        quantity: 5,
      },
      {
        id: 'shop-product-5-run-all-time',
        name: '5 runs all time',
        description: 'Unlock 5 runs NOW for all time. Increase your chance to win more points',
        category: 'run',
        amount: 50000,
        period: 'all-time',
        quantity: 5,
      },
      {
        id: 'shop-product-10-run-60-minutes',
        name: '10 runs 60 minutes',
        description: 'Unlock 10 runs NOW during 60 minutes. Increase your chance to win more points',
        category: 'run',
        amount: 17000,
        period: 60,
        quantity: 10,
      },
      {
        id: 'shop-product-10-run-all-time',
        name: '10 runs all time',
        description: 'Unlock 10 runs NOW for all time. Increase your chance to win more points',
        category: 'run',
        amount: 70000,
        period: 'all-time',
        quantity: 10,
      },
      {
        id: 'shop-product-20-run-all-time',
        name: '20 runs all time',
        description: 'Unlock 20 runs NOW for all time. Increase your chance to win more points',
        category: 'run',
        amount: 100000,
        period: 'all-time',
        quantity: 20,
      },
    ],
  },
}
