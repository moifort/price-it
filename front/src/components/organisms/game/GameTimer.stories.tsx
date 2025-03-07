import type { Meta, StoryObj } from '@storybook/react'
import type { Seconde } from '../../../../../back/src/utils/index.type'
import { GameTimer } from './GameTimer'

const meta = {
  component: GameTimer,
} satisfies Meta<typeof GameTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    timer: 10 as Seconde,
  },
}

export const Warning: Story = {
  args: {
    timer: 5 as Seconde,
  },
}

export const Critical: Story = {
  args: {
    timer: 2 as Seconde,
  },
}
