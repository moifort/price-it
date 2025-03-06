'use client'

import type { GameState, Product } from '@/app/game/types'
import { useEffect, useState } from 'react'
import type { Score } from '../../../../back/src/score/types'
import { ActionButtons } from '../organisms/game/ActionButtons'
import { GameHeader } from '../organisms/game/GameHeader'
import { GameTimer } from '../organisms/game/GameTimer'
import { ProductCard } from '../organisms/game/ProductCard'
import { ResultOverlay } from '../organisms/game/ResultOverlay'
import { GameTemplate } from '../templates/Game'

export const Game = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
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
      onNavigateHome()
      return
    }

    // Reset for next product
    setTimer(10)
    setGameState('playing')
    setIsCorrect(null)

    // In a real app, you'd fetch the next product here
  }

  return (
    <GameTemplate
      header={<GameHeader score={score} runsLeft={runsLeft} onExit={onNavigateHome} />}
      content={
        <>
          <GameTimer timer={timer} />
          <ProductCard product={currentProduct} />
          <ActionButtons gameState={gameState} onGuess={handleGuess} />
        </>
      }
      overlay={
        <ResultOverlay
          gameState={gameState}
          isCorrect={isCorrect}
          product={currentProduct}
          runsLeft={runsLeft}
          onNext={nextProduct}
        />
      }
    />
  )
}
