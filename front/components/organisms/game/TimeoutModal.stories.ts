import type { Meta, StoryObj } from '@storybook/vue3'
import { Amount, Url } from '../../../../back/src/utils/validators'
import component from './TimeoutModal.vue'

const meta = {
  component,
  decorators: [() => ({ template: '<div style="height: 330px; position: relative;"><story /></div>' })],
} satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: Amount(89),
    productLink: Url('https://example.com/product'),
    'onClick:next': () => console.log('onClick:next'),
  },
}
