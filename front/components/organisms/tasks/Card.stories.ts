import { action } from '@storybook/addon-actions'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Point } from '../../../../back/src/score/validators'
import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: 'youtube',
    points: Point(3000),
    onClick: fn(),
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}
