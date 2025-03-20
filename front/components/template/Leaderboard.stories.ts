import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import type { Meta, StoryObj } from '@storybook/vue3'
import component from './Leaderboard.vue'

const meta = {
  component,
  render: (args) => ({
    components: { Template: component, Button, Card, CardContent, CardHeader, CardTitle },
    setup: () => ({ args }),
    template: `
      <Template>
        <template #title>
          <div class="flex items-center gap-2 border-2 border-dashed border-gray-400 p-4 relative w-full">
            <span class="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">title slot</span>
            <h2 class="text-2xl font-bold">Dashboard</h2>
          </div>
        </template>
        <template #body>
          <div class="border-2 border-dashed border-gray-400 p-4 relative w-full">
            <span class="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">body slot</span>
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is the main content area of your dashboard.</p>
              </CardContent>
            </Card>
          </div>
        </template>
      </Template>
    `,
  }),
} satisfies Meta<typeof component>

export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {}
