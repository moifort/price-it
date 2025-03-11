import type { Meta, StoryObj } from '@storybook/react'
import type { Amount } from '../../../../../back/src/utils/index.type'
import { ActionButtons } from './ActionButtons'

const meta = {
  component: ActionButtons,
} satisfies Meta<typeof ActionButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isActive: true,
    onGuess: (guess) => console.log(`User guessed: ${guess}`),
    displayPrice: 299.99 as Amount,
  },
}

export const Disabled: Story = {
  args: {
    isActive: false,
    onGuess: (guess) => console.log(`User guessed: ${guess}`),
    displayPrice: 299.99 as Amount,
  },
}
