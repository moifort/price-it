import type { Meta, StoryObj } from '@storybook/react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { ActionButton } from './ActionButton'

const meta = {
  component: ActionButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    isActive: true,
    onClick: () => console.log('Button clicked'),
    icon: <ArrowDown className="w-6 h-6 text-blue-500" />,
    label: 'Lower',
  },
}

export const Inactive: Story = {
  args: {
    isActive: false,
    onClick: () => console.log('Button clicked'),
    icon: <ArrowDown className="w-6 h-6 text-blue-500" />,
    label: 'Lower',
  },
}

export const WithPrice: Story = {
  args: {
    isActive: true,
    onClick: () => console.log('Button clicked'),
    icon: <span className="font-bold text-lg">$299.99</span>,
    label: 'Exact',
  },
}

export const HigherButton: Story = {
  args: {
    isActive: true,
    onClick: () => console.log('Button clicked'),
    icon: <ArrowUp className="w-6 h-6 text-red-500" />,
    label: 'Higher',
  },
}
