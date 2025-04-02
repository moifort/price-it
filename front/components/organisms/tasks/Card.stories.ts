import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Point } from '../../../../back/src/score/validators'
import { Media } from '../../../../back/src/task/validators'
import { Url } from '../../../../back/src/utils/validators'

import component from './Card.vue'

const meta = { component } satisfies Meta<typeof component>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    media: Media('youtube'),
    url: Url('https://www.youtube.com/watch?v=abc123'),
    points: Point(3000),
    'onClick:join': fn(),
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}
