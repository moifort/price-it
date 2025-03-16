import type { Meta, StoryObj } from '@storybook/vue3'
import { Seconde } from '../../../../back/src/utils/validators'
import Component from './BestTimeCard.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    time: Seconde(5),
    bonus: Seconde(10),
  },
}
