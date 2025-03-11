'use client'

import {} from '@/components/atoms/card'
import { BestTimeCard } from '@/components/organisms/dashboard/BestTimeCard'
import { initData, useSignal } from '@telegram-apps/sdk-react'
import { Star } from 'lucide-react'
import type { Score } from '../../../../back/src/score/types'
import type { Seconde } from '../../../../back/src/utils/index.type'
import { DailyRunsCard } from '../organisms/dashboard/DailyRunsCard'
import { GameStartButton } from '../organisms/dashboard/GameStartButton'
import { ScoreCard } from '../organisms/dashboard/ScoreCard'
import { Dashboard as DashboardTemplate } from '../templates/Dashboard'

export const Dashboard = ({ onStartGame }: { onStartGame: () => void }) => {
  const user = useSignal(initData.user)
  return (
    <DashboardTemplate
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Price It! {user && <div className="text-sm font-normal">{user.first_name}</div>}
          </h1>
          <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
        </div>
      }
      body={
        <div className="flex flex-col gap-6">
          <ScoreCard score={0 as Score} />
          <div className="grid grid-cols-2 gap-4">
            <DailyRunsCard current={10} total={10} />
            <BestTimeCard time={8 as Seconde} />
          </div>
        </div>
      }
      action={<GameStartButton onClick={onStartGame} />}
    />
  )
}
