import type { Meta, StoryObj } from '@storybook/vue3'
import { Url } from '../../../../back/src/utils/validators'
import component from './ProductCard.vue'

const meta = { component: component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Wireless Headphones',
    imageUrl: Url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
  },
}

export const LongName: Story = {
  args: {
    name: 'Super Deluxe Premium Wireless Noise-Cancelling Headphones with Extended Battery Life',
    imageUrl: Url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
  },
}
