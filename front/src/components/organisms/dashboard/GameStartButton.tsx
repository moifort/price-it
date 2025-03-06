'use client'

import { Button } from '@/components/atoms/button'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GameStartButton = () => {
  const router = useRouter()
  
  const handleStartGame = () => {
    router.push('/game')
  }
  
  return (
    <Button 
      size="lg" 
      className="w-full gap-2 text-lg h-14 animate-pulse"
      onClick={handleStartGame}
    >
      <Play className="w-6 h-6" />
      Start Game
    </Button>
  )
}
