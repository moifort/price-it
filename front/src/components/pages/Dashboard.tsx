'use client'

import { Button } from '@/components/atoms/button'
import { Dashboard as DashboardTemplate } from '../templates/Dashboard'

export function Dashboard() {
  return (
    <DashboardTemplate
      title={
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-center">Price It!</h1>
        </div>
      }
      body={
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-lg font-semibold">Total Score</h2>
            <p className="text-muted-foreground">0</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-lg font-semibold">Daily Runs Left</h2>
            <p className="text-muted-foreground">10</p>
          </div>
        </div>
      }
      action={<Button className="w-full">Start game</Button>}
    />
  )
}
