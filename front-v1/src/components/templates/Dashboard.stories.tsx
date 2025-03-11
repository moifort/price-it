import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Dashboard } from '@/components/templates/Dashboard'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Dashboard,
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof Dashboard>

export const Default: Story = {
  args: {
    title: (
      <div className="flex items-center gap-2 border-2 border-dashed border-gray-400 p-4 relative w-full">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">title slot</span>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <span className="text-sm text-muted-foreground">Welcome back!</span>
      </div>
    ),
    body: (
      <div className="border-2 border-dashed border-gray-400 p-4 relative w-full">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">body slot</span>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the main content area of your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    ),
    action: (
      <div className="border-2 border-dashed border-gray-400 p-4 relative w-full">
        <span className="absolute -top-3 left-2 bg-white px-2 text-xs text-gray-500">action slot</span>
        <Button>View Details</Button>
      </div>
    ),
  },
}
