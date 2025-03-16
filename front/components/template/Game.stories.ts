import type { Meta, StoryObj } from '@storybook/vue3'
import Template from './Game.vue'

const meta = {
  component: Template,
  render: (args) => ({
    components: { Template },
    setup: () => ({ args }),
    template: `
      <Template>
        <template #header>
          <div class="flex justify-between items-center border-2 border-dashed border-gray-400 p-4 relative w-full">
            <span class="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">header slot</span>
            <Button variant="outline">Back</Button>
            <div class="font-bold">Score: 5</div>
          </div>
        </template>

        <template #body>
          <div class="flex justify-between flex-col items-center border-2 border-dashed border-gray-400 p-4 relative w-full">
            <span class="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">body slot</span>
            <div class="bg-card p-4 rounded-lg h-64 flex items-center justify-center">Product Card</div>
          </div>
        </template>

        <template #actions>
          <div class="flex justify-between flex-col items-center border-2 border-dashed border-gray-400 p-4 relative w-full">
            <span class="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">action slot</span>
            <div class="flex items-center justify-center">Actions</div>
          </div>
        </template>
      </Template>
    `,
  }),
} satisfies Meta<typeof Template>

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {}
