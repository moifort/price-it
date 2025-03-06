import type { GameState, Product } from '@/app/game/types'
import { Button } from '@/components/atoms/button'
import { Card } from '@/components/atoms/card'
import { cn } from '@/lib/utils'
import { Clock, Trophy, X } from 'lucide-react'

type ResultOverlayProps = {
  gameState: GameState
  isCorrect: boolean | null
  product: Product
  runsLeft: number
  onNext: () => void
}

export const ResultOverlay = ({ gameState, isCorrect, product, runsLeft, onNext }: ResultOverlayProps) => {
  if (gameState === 'playing') return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
      <Card className="w-full max-w-md p-8 flex flex-col items-center gap-6 text-center">
        {gameState === 'timeout' ? (
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/20 mb-2">
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        ) : isCorrect ? (
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-2">
            <Trophy className="w-10 h-10 text-green-500" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-2">
            <X className="w-10 h-10 text-red-500" />
          </div>
        )}

        {gameState === 'timeout' ? (
          <h2 className="text-2xl font-bold">Time's Up!</h2>
        ) : (
          <h2 className={cn('text-2xl font-bold', isCorrect ? 'text-green-500' : 'text-red-500')}>
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </h2>
        )}

        <p className="text-xl">
          The price was <span className="font-bold">${product.price.toFixed(2)}</span>
        </p>

        <Button size="lg" className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={onNext}>
          {runsLeft > 1 ? 'Next Product' : 'Finish Game'}
        </Button>
      </Card>
    </div>
  )
}
