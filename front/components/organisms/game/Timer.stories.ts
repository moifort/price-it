import type { Meta, StoryObj } from '@storybook/vue3'
import { Seconde } from '../../../../back/src/utils/validators'
import component from './Timer.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    timer: Seconde(5),
    onTimeout: () => console.log('Timeout'),
  },
}
