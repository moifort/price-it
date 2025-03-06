import { Card, CardContent } from '@/components/atoms/card'
import { Trophy } from 'lucide-react'
import type { Score } from '../../../../../back/src/score/types'

export const ScoreCard = ({ score }: { score: Score }) => (
  <Card className="relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-16 -translate-y-16" />
    <CardContent className="pt-6">
      <div className="flex flex-col items-center gap-2">
        <Trophy className="w-12 h-12 text-yellow-500" />
        <h2 className="text-2xl font-semibold text-center">Total Score</h2>
        <p className="text-4xl font-bold text-primary">{score}</p>
        <p className="text-sm text-muted-foreground">Keep playing to increase your score!</p>
      </div>
    </CardContent>
  </Card>
)
