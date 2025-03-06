'use client'

import type { ReactNode } from 'react'

export function Dashboard({
  title,
  body,
  action,
}: {
  title: ReactNode
  body: ReactNode
  action: ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">{title}</div>
      <div className="flex-1">{body}</div>
      <div className="flex items-center justify-end">{action}</div>
    </div>
  )
}
