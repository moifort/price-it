import type { Meta, StoryObj } from '@storybook/vue3'
import TimeoutModal from './TimeoutModal.vue'

const meta = {
  title: 'Organisms/Game/TimeoutModal',
  component: TimeoutModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof TimeoutModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    productName: 'Smart Watch',
    realPrice: 299.99,
    productLink: 'https://example.com/product',
    isOpen: true,
  },
} 