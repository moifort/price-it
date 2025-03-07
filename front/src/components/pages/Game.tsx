'use client'

import type { Product } from '@/app/game/types'
import { LoseOverlay } from '@/components/organisms/game/LoseOverlay'
import { TimeoutOverlay } from '@/components/organisms/game/TimeoutOverlay'
import { WinOverlay } from '@/components/organisms/game/WinOverlay'
import { useEffect, useState } from 'react'
import type { Score } from '../../../../back/src/score/types'
import type { Amount, Seconde, Url } from '../../../../back/src/utils/index.type'
import { ActionButtons } from '../organisms/game/ActionButtons'
import { GameHeader } from '../organisms/game/GameHeader'
import { GameTimer } from '../organisms/game/GameTimer'
import { ProductCard } from '../organisms/game/ProductCard'
import { GameTemplate } from '../templates/Game'

// Adapter component for ProductCard
const ProductCardAdapter = ({ product }: { product: Product }) => {
  return <ProductCard name={product.name} imageUrl={product.imageUrl as unknown as Url} />
}

// Wrapper component to render the correct overlay based on game state
const GameOverlay = ({
  gameState,
  isCorrect,
  product,
  onNext,
  isLastRun,
}: {
  gameState: 'playing' | 'guessed' | 'timeout'
  isCorrect: boolean | null
  product: Product
  onNext: () => void
  isLastRun: boolean
}) => {
  if (gameState === 'playing') return null

  // Cast product properties to the expected types
  const price = product.price as unknown as Amount
  const productUrl = product.imageUrl as unknown as Url

  if (gameState === 'timeout') {
    return <TimeoutOverlay price={price} productUrl={productUrl} onNext={onNext} isLastRun={isLastRun} />
  }

  if (isCorrect) {
    return <WinOverlay price={price} productUrl={productUrl} onNext={onNext} isLastRun={isLastRun} />
  }

  return <LoseOverlay price={price} productUrl={productUrl} onNext={onNext} isLastRun={isLastRun} />
}

export const Game = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
  const [score, setScore] = useState<Score>(0 as Score)
  const [runsLeft, setRunsLeft] = useState(10)
  const [timer, setTimer] = useState<number>(10)
  const [gameState, setGameState] = useState<'playing' | 'guessed' | 'timeout'>('playing')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Mock product - in a real app this would come from an API call or props
  const [currentProduct] = useState<Product>({
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    price: 299.99,
  })

  // Initialize displayPrice with the product price
  const [displayPrice, setDisplayPrice] = useState<number>(currentProduct.price)

  // Generate a display price for the 'exact' button
  useEffect(() => {
    if (gameState === 'playing') {
      const actualPrice = currentProduct.price

      // 50% chance to show the real price, otherwise show a price that's ±20% of the actual price
      const showRealPrice = Math.random() > 0.5

      if (showRealPrice) {
        setDisplayPrice(actualPrice)
      } else {
        const variation = Math.random() * 0.4 - 0.2 // Random value between -0.2 and 0.2
        const adjustedPrice = actualPrice * (1 + variation)
        setDisplayPrice(Number(adjustedPrice.toFixed(2)))
      }
    }
  }, [currentProduct, gameState])

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
    setDisplayPrice(currentProduct.price)

    // In a real app, you'd fetch the next product here
  }

  // Safely cast displayPrice for ActionButtons
  const safeDisplayPrice = displayPrice as unknown as Amount

  return (
    <GameTemplate
      header={<GameHeader score={score} runsLeft={runsLeft} onExit={onNavigateHome} />}
      content={
        <>
          <GameTimer timer={timer as unknown as Seconde} />
          <ProductCardAdapter product={currentProduct} />
          <ActionButtons isActive={gameState === 'playing'} onGuess={handleGuess} displayPrice={safeDisplayPrice} />
        </>
      }
      overlay={
        <GameOverlay
          gameState={gameState}
          isCorrect={isCorrect}
          product={currentProduct}
          onNext={nextProduct}
          isLastRun={runsLeft <= 1}
        />
      }
    />
  )
}
