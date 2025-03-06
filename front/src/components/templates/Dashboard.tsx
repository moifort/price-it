'use client'

import type { ReactNode } from 'react'

interface DashboardProps {
  title?: ReactNode
  body?: ReactNode
  action?: ReactNode
}

export function Dashboard({ title, body, action }: DashboardProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {title && <div className="flex items-center justify-between">{title}</div>}
      {body && <div className="flex-1">{body}</div>}
      {action && <div className="flex items-center justify-end">{action}</div>}
    </div>
  )
}
