import type { Meta, StoryObj } from '@storybook/vue3'
import { Point } from '../../../../back/src/score/validators'
import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { brand: 'youtube', points: Point(3000) },
}
