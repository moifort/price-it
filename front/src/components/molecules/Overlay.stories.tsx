import { Button } from '@/components/atoms/button'
import type { Meta, StoryObj } from '@storybook/react'
import { Clock } from 'lucide-react'
import { Overlay } from './Overlay'

const meta = {
  component: Overlay,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Overlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: <Clock className="w-10 h-10" />,
    title: 'Overlay Title',
    description: <p>This is a description of the overlay.</p>,
    actions: (
      <Button size="lg" className="w-full">
        Action Button
      </Button>
    ),
  },
}
