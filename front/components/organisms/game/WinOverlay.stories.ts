import type { Meta, StoryObj } from '@storybook/vue3'
import WinOverlay from './WinOverlay.vue'

const meta = {
  title: 'Organisms/Game/WinOverlay',
  component: WinOverlay,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof WinOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: 99.99,
    productUrl: 'https://example.com/product',
    onNext: () => console.log('Next clicked'),
    isLastRun: false,
  },
}

export const LastRun: Story = {
  args: {
    price: 99.99,
    productUrl: 'https://example.com/product',
    onNext: () => console.log('Finish clicked'),
    isLastRun: true,
  },
} 