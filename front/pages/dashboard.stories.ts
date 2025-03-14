import type { Meta, StoryObj } from '@storybook/vue3'
import { HttpResponse, graphql } from 'msw'
import Dashboard from './dashboard.vue'

const meta = {
  component: Dashboard,
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query('Player', () => {
          return HttpResponse.json({ data: { allInfo: {} } })
        }),
      ],
    },
  },
}
