'use client'

import { Button } from '@/components/atoms/button'
import {} from '@/components/atoms/card'
import { BestTimeCard } from '@/components/organisms/dashboard/BestTimeCard'
import { Play, Star } from 'lucide-react'
import type { Score } from '../../../../back/src/score/index.type'
import type { Seconde } from '../../../../back/src/utils/index.type'
import { DailyRunsCard } from '../organisms/dashboard/DailyRunsCard'
import { ScoreCard } from '../organisms/dashboard/ScoreCard'
import { Dashboard as DashboardTemplate } from '../templates/Dashboard'

export const Dashboard = () => (
  <DashboardTemplate
    title={
      <div className="flex items-center justify-center w-full gap-2">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Price It!
        </h1>
        <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
      </div>
    }
    body={
      <div className="flex flex-col gap-6">
        <ScoreCard score={0 as Score} />

        <div className="grid grid-cols-2 gap-4">
          <DailyRunsCard current={10} total={10} />

          <BestTimeCard time={0 as Seconde} />
        </div>

        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="w-4/5 h-full bg-primary rounded-full" />
        </div>
        <p className="text-sm text-center text-muted-foreground">1433 points for the next level!</p>
      </div>
    }
    action={
      <Button size="lg" className="w-full gap-2 text-lg h-14 animate-pulse">
        <Play className="w-6 h-6" />
        Start Game
      </Button>
    }
  />
)
