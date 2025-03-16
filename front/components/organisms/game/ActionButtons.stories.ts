import type { Meta, StoryObj } from '@storybook/vue3'
import { Amount } from '../../../../back/src/utils/validators'
import component from './ActionButtons.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isActive: true,
    displayPrice: Amount(99.99),
    'onClick:less': () => console.log('less'),
    'onClick:exact': () => console.log('exact'),
    'onClick:more': () => console.log('more'),
  },
}

export const Inactive: Story = {
  args: {
    ...Default.args,
    isActive: false,
  },
}
