import type { Meta, StoryObj } from '@storybook/vue3'
import component from './Navigation.vue'

// Define Menu type locally to match the component
type Menu = 'game' | 'shop' | 'top'

const meta = {
  component,
  parameters: { layout: 'fullscreen' },
  decorators: [
    () => ({
      template: '<div style="height: 140px; position: relative;"><story /></div>',
    }),
  ],
  argTypes: {
    active: {
      control: { type: 'radio' },
      options: ['game', 'shop', 'top'],
    },
  },
} satisfies Meta<typeof component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    active: 'game',
    'onClick:goTo': (active: Menu) => console.log(`onClick:${active}`),
  },
}
