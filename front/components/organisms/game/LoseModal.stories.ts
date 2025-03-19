import type { Meta, StoryObj } from '@storybook/vue3'
import LoseModal from './LoseModal.vue'

const meta = {
  title: 'Organisms/Game/LoseModal',
  component: LoseModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} satisfies Meta<typeof LoseModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    productName: 'Bluetooth Speaker',
    realPrice: 89.99,
    productLink: 'https://example.com/product',
    isOpen: true,
  },
} 