import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './ProductCard'

const meta = {
  component: ProductCard,
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    product: {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: 299.99,
    },
  },
}

export const Smartphone: Story = {
  args: {
    product: {
      id: '2',
      name: 'Smartphone XS',
      description: 'Latest flagship smartphone with powerful camera and all-day battery',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
      price: 799.99,
    },
  },
}

export const Laptop: Story = {
  args: {
    product: {
      id: '3',
      name: 'Ultrabook Pro',
      description: 'Thin and light laptop with incredible performance and stunning display',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      price: 1299.99,
    },
  },
}
