import type { Meta, StoryObj } from '@storybook/react'
import type { Url } from '../../../../../back/src/utils/index.type'
import { ProductCard } from './ProductCard'

const meta = {
  component: ProductCard,
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Wireless Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' as Url,
  },
}

export const Smartphone: Story = {
  args: {
    name: 'Smartphone XS',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' as Url,
  },
}
