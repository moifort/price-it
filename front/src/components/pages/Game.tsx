'use client'

import type { GameState, Product } from '@/app/game/types'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowLeft, ArrowUp, Clock, Trophy, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Score } from '../../../../back/src/score/types'

export const Game = () => {
  const router = useRouter()
  const [score, setScore] = useState<Score>(0 as Score)
  const [runsLeft, setRunsLeft] = useState(10)
  const [timer, setTimer] = useState(10)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Mock product - in a real app this would come from an API call or props
  const [currentProduct] = useState<Product>({
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    price: 299.99,
  })

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setGameState('timeout')
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  // Handler for user's guess
  const handleGuess = (guess: 'less' | 'exact' | 'more') => {
    if (gameState !== 'playing') return

    setGameState('guessed')

    // In a real app, you'd compare the guess with the actual price
    // For this example, let's just use a random outcome
    const correct = Math.random() > 0.5
    setIsCorrect(correct)

    if (correct) {
      setScore((prevScore) => (prevScore + 1) as Score)
    }
  }

  const nextProduct = () => {
    setRunsLeft((prev) => prev - 1)

    if (runsLeft <= 1) {
      router.push('/')
      return
    }

    // Reset for next product
    setTimer(10)
    setGameState('playing')
    setIsCorrect(null)

    // In a real app, you'd fetch the next product here
  }

  const exitGame = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 gap-6 bg-gradient-to-b from-background to-background/80">
      {/* Header with score and exit button */}
      <div className="flex justify-between items-center w-full max-w-4xl">
        <Button
          variant="outline"
          onClick={exitGame}
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

      {/* Game Content */}
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mt-4">
        {/* Timer */}
        <Card
          className={cn(
            'w-full transition-colors border-2',
            timer <= 3 ? 'border-red-500 animate-pulse' : timer <= 5 ? 'border-yellow-500' : 'border-primary/40',
          )}
        >
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex items-center gap-3">
              <Clock className={cn('w-6 h-6', timer <= 3 && 'text-red-500')} />
              <span
                className={cn(
                  'text-4xl font-bold tabular-nums',
                  timer <= 3 ? 'text-red-500' : timer <= 5 ? 'text-yellow-500' : 'text-primary',
                )}
              >
                {timer}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Product Image */}
        <Card className="w-full overflow-hidden shadow-lg border-2 border-primary/20 bg-card/90">
          <div className="relative w-full h-72 md:h-96">
            <Image
              src={currentProduct.imageUrl}
              alt={currentProduct.name}
              fill
              unoptimized
              priority
              className="object-cover transition-all hover:scale-105 duration-700"
            />
          </div>
        </Card>

        {/* Product Info */}
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {currentProduct.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">{currentProduct.description}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 w-full mt-2">
          <Button
            variant="outline"
            size="lg"
            className={cn(
              'h-24 text-lg flex flex-col gap-2 border-2 hover:border-blue-500 hover:text-blue-500 transition-all',
              gameState !== 'playing' && 'opacity-50 pointer-events-none',
            )}
            onClick={() => handleGuess('less')}
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
            onClick={() => handleGuess('exact')}
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
            onClick={() => handleGuess('more')}
            disabled={gameState !== 'playing'}
          >
            <ArrowUp className="w-6 h-6 text-red-500" />
            <span>Higher</span>
          </Button>
        </div>
      </div>

      {/* Result Overlay */}
      {gameState !== 'playing' && (
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
              The price was <span className="font-bold">${currentProduct.price.toFixed(2)}</span>
            </p>

            <Button size="lg" className="w-full mt-4 bg-primary hover:bg-primary/90" onClick={nextProduct}>
              {runsLeft > 1 ? 'Next Product' : 'Finish Game'}
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
