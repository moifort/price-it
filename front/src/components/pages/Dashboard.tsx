'use client'

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
            <p className="text-muted-foreground">No statistics available</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-lg font-semibold">Daily Runs Left</h2>
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </div>
      }
      action={
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md bg-primary px-4 py-2">
            Start game
          </button>
        </div>
      }
    />
  )
}
