import { Button } from '@/components/atoms/button'
import { ArrowLeft, Trophy } from 'lucide-react'
import type { Score } from '../../../../../back/src/score/types'

export const GameHeader = ({ score, runsLeft, onExit }: { score: Score; runsLeft: number; onExit: () => void }) => (
  <div className="flex items-center justify-between">
    <Button
      variant="outline"
      onClick={onExit}
      className="gap-2 transition-all hover:bg-destructive hover:text-destructive-foreground"
    >
      <ArrowLeft className="w-4 h-4" />
      Exit Game
    </Button>

    <div className="flex items-center gap-4 bg-card p-2 px-4 rounded-full shadow-md">
      <div className="flex items-center gap-1.5">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="font-bold">{score}</span>
      </div>
      <div className="h-4 w-px bg-border/60" />
      <div className="font-medium text-sm text-muted-foreground">
        Runs: <span className="text-foreground font-semibold">{runsLeft}</span>
      </div>
    </div>
  </div>
)
