'use client'

import type { ReactNode } from 'react'

export function GameTemplate({
  header,
  content,
  overlay,
}: {
  header: ReactNode
  content: ReactNode
  overlay?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 gap-6 bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl">{header}</div>

      {/* Game Content */}
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mt-4">{content}</div>

      {/* Overlay */}
      {overlay}
    </div>
  )
}
