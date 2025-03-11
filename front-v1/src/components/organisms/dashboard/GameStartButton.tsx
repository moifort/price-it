'use client'

import { Button } from '@/components/atoms/button'
import { Play } from 'lucide-react'

export const GameStartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button size="lg" className="w-full gap-2 text-lg h-14 animate-pulse" onClick={onClick}>
      <Play className="w-6 h-6" />
      Start Game
    </Button>
  )
}
