import type { Meta, StoryObj } from '@storybook/vue3'
import WinModal from './WinModal.vue'

const meta = {
  title: 'Organisms/Game/WinModal',
  component: WinModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof WinModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    productName: 'Wireless Headphones',
    realPrice: 129.99,
    productLink: 'https://example.com/product',
    isOpen: true,
  },
} 