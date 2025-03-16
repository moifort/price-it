import type { Meta, StoryObj } from '@storybook/vue3'
import ProductCard from './ProductCard.vue'

const meta = {
  title: 'Organisms/Game/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Wireless Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
}

export const LongName: Story = {
  args: {
    name: 'Super Deluxe Premium Wireless Noise-Cancelling Headphones with Extended Battery Life',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
} 