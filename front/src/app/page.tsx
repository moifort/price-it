'use client'

import { Dashboard } from '@/components/pages/Dashboard'
import { useRouter } from 'next/navigation'

export default function Index() {
  const router = useRouter()
  return <Dashboard onStartGame={() => router.push('/game')} />
}
