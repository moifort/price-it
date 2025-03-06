'use client'

import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import { Clock, Play, Star, Target } from 'lucide-react'
import { ScoreCard } from '../organisms/ScoreCard'
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
        <ScoreCard score={0} />

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Target className="w-8 h-8 text-blue-500" />
                <h3 className="text-lg font-semibold">Daily Runs</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">10</span>
                  <span className="text-sm text-muted-foreground">/10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-8 h-8 text-green-500" />
                <h3 className="text-lg font-semibold">Best Time</h3>
                <p className="text-3xl font-bold text-primary">8.5s</p>
              </div>
            </CardContent>
          </Card>
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
