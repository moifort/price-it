import type { Meta, StoryObj } from '@storybook/react'
import type { Amount, Url } from '../../../../../back/src/utils/index.type'
import { WinOverlay } from './WinOverlay'

const meta = {
  component: WinOverlay,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WinOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: 29.99 as Amount,
    productUrl: 'https://example.com/product/123' as Url,
    onNext: () => console.log('Next clicked'),
    isLastRun: false,
  },
}

export const LastRun: Story = {
  args: {
    price: 129.99 as Amount,
    productUrl: 'https://example.com/product/456' as Url,
    onNext: () => console.log('Finish Game clicked'),
    isLastRun: true,
  },
}
