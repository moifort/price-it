import type { GameState } from '@/app/game/types'
import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

type ActionButtonsProps = {
  gameState: GameState
  onGuess: (guess: 'less' | 'exact' | 'more') => void
}

export const ActionButtons = ({ gameState, onGuess }: ActionButtonsProps) => (
  <div className="grid grid-cols-3 gap-4 w-full mt-2">
    <Button
      variant="outline"
      size="lg"
      className={cn(
        'h-24 text-lg flex flex-col gap-2 border-2 hover:border-blue-500 hover:text-blue-500 transition-all',
        gameState !== 'playing' && 'opacity-50 pointer-events-none',
      )}
      onClick={() => onGuess('less')}
      disabled={gameState !== 'playing'}
    >
      <ArrowDown className="w-6 h-6 text-blue-500" />
      <span>Lower</span>
    </Button>

    <Button
      variant="outline"
      size="lg"
      className={cn(
        'h-24 text-lg flex flex-col gap-2 border-2 hover:border-primary hover:text-primary transition-all',
        gameState !== 'playing' && 'opacity-50 pointer-events-none',
      )}
      onClick={() => onGuess('exact')}
      disabled={gameState !== 'playing'}
    >
      <span className="font-bold text-lg">=</span>
      <span>Exact</span>
    </Button>

    <Button
      variant="outline"
      size="lg"
      className={cn(
        'h-24 text-lg flex flex-col gap-2 border-2 hover:border-red-500 hover:text-red-500 transition-all',
        gameState !== 'playing' && 'opacity-50 pointer-events-none',
      )}
      onClick={() => onGuess('more')}
      disabled={gameState !== 'playing'}
    >
      <ArrowUp className="w-6 h-6 text-red-500" />
      <span>Higher</span>
    </Button>
  </div>
)
