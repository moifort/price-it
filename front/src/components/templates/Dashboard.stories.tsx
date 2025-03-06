import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { Dashboard } from '@/components/templates/Dashboard'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Dashboard,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof Dashboard>

export const Default: Story = {
  args: {
    title: (
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <span className="text-sm text-muted-foreground">Welcome back!</span>
      </div>
    ),
    body: (
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of your dashboard.</p>
        </CardContent>
      </Card>
    ),
    action: <Button>View Details</Button>,
  },
}
