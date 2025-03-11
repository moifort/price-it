'use client'

import { Dashboard } from '@/components/pages/Dashboard'
import { useClientOnce } from '@/hooks/useClientOnce'
import { init, initData } from '@telegram-apps/sdk-react'
import { useRouter } from 'next/navigation'

export default function Index() {
  useClientOnce(() => {
    init()
    initData.restore()
  })
  const router = useRouter()
  return <Dashboard onStartGame={() => router.push('/game')} />
}
