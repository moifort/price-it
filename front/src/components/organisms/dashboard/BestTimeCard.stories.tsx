import type { Meta, StoryObj } from '@storybook/react'
import type { Seconde } from '../../../../../back/src/utils/index.type'
import { BestTimeCard } from './BestTimeCard'

const meta = {
  component: BestTimeCard,
} satisfies Meta<typeof BestTimeCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { time: 8 as Seconde },
}
