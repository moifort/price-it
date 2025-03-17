import type { Meta, StoryObj } from '@storybook/vue3'
import { Run } from '../../../back/src/run/validators'
import { Score } from '../../../back/src/score/validators'
import { Amount, Seconde, Url } from '../../../back/src/utils/validators'
import Component from './Game.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: Score(1500),
    runsLeft: Run(5),
    totalTime: Seconde(90),
    productName: 'MacBook Pro 16"',
    productImageUrl: Url(
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
    ),
    displayPrice: Amount(1999.99),
    'onClick:less': () => console.log('onClick:less'),
    'onClick:more': () => console.log('onClick:more'),
    'onClick:exact': () => console.log('onClick:exact'),
    'onClick:exit': () => console.log('onClick:exit'),
  },
}

export const Timeout: Story = {
  args: {
    ...Default.args,
    totalTime: Seconde(0),
  },
}

export const NoMoreRun: Story = {
  args: {
    ...Default.args,
    runsLeft: Run(0),
  },
}
