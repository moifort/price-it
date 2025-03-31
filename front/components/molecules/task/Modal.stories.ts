import { fn } from '@storybook/test'
import type { StoryObj } from '@storybook/vue3'
import { Media } from '../../../../back/src/task/validators'
import { Url } from '../../../../back/src/utils/validators'
import component from './Modal.vue'

const meta = { component } as const
export default meta
type Story = StoryObj<typeof meta>

export const Telegram: Story = {
  args: {
    media: Media('telegram'),
    url: Url('https://t.me/example'),
    close: fn(),
  },
}
