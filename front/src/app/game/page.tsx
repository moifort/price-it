'use client'

import { Game } from '@/components/pages/Game'
import { useRouter } from 'next/navigation'

export default function GamePage() {
  const router = useRouter()
  return <Game onNavigateHome={() => router.push('/')} />
}
