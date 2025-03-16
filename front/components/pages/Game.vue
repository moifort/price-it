<template>
  <GameTemplate
    :header="header"
    :content="content"
    :overlay="overlay"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h, Fragment } from 'vue'
import type { Product } from '../../app/game/types'
import type { Score } from '../../../back/src/score/types'
import type { Amount, Seconde, Url } from '../../../back/src/utils/index.type'
import GameTemplate from '~/components/template/Game.vue'
import GameHeader from '~/components/organisms/game/GameHeader.vue'
import GameTimer from '~/components/organisms/game/GameTimer.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import WinOverlay from '~/components/organisms/game/WinOverlay.vue'
import LoseOverlay from '~/components/organisms/game/LoseOverlay.vue'
import TimeoutOverlay from '~/components/organisms/game/TimeoutOverlay.vue'

const props = defineProps<{
  onNavigateHome: () => void
}>()

// Game state
const score = ref<Score>(0 as Score)
const runsLeft = ref(10)
const timer = ref<number>(10)
const gameState = ref<'playing' | 'guessed' | 'timeout'>('playing')
const isCorrect = ref<boolean | null>(null)

// Mock product - in a real app this would come from an API call or props
const currentProduct = ref<Product>({
  id: '1',
  name: 'Wireless Headphones',
  description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  price: 299.99,
})

// Initialize displayPrice with the product price
const displayPrice = ref<number>(currentProduct.value.price)

// Generate a display price for the 'exact' button
onMounted(() => {
  if (gameState.value === 'playing') {
    const actualPrice = currentProduct.value.price

    // 50% chance to show the real price, otherwise show a price that's ±20% of the actual price
    const showRealPrice = Math.random() > 0.5

    if (showRealPrice) {
      displayPrice.value = actualPrice
    } else {
      const variation = Math.random() * 0.4 - 0.2 // Random value between -0.2 and 0.2
      const adjustedPrice = actualPrice * (1 + variation)
      displayPrice.value = Number(adjustedPrice.toFixed(2))
    }
  }

  // Timer effect
  const interval = setInterval(() => {
    if (gameState.value !== 'playing') return

    timer.value -= 1
    if (timer.value <= 0) {
      clearInterval(interval)
      gameState.value = 'timeout'
      timer.value = 0
    }
  }, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Handler for user's guess
const handleGuess = (guess: 'less' | 'exact' | 'more') => {
  if (gameState.value !== 'playing') return

  gameState.value = 'guessed'

  // In a real app, you'd compare the guess with the actual price
  // For this example, let's just use a random outcome
  const correct = Math.random() > 0.5
  isCorrect.value = correct

  if (correct) {
    score.value = (score.value + 1) as Score
  }
}

const nextProduct = () => {
  runsLeft.value -= 1

  if (runsLeft.value <= 0) {
    props.onNavigateHome()
    return
  }

  // Reset for next product
  timer.value = 10
  gameState.value = 'playing'
  isCorrect.value = null
  displayPrice.value = currentProduct.value.price

  // In a real app, you'd fetch the next product here
}

// Safely cast displayPrice for ActionButtons
const safeDisplayPrice = computed(() => displayPrice.value as unknown as Amount)

// Components for template
const header = computed(() => 
  h(GameHeader, { 
    score: score.value, 
    runsLeft: runsLeft.value, 
    onExit: props.onNavigateHome 
  })
)

const content = computed(() => 
  h(Fragment, {}, [
    h(GameTimer, { timer: timer.value as unknown as Seconde }),
    h(ProductCard, { 
      name: currentProduct.value.name, 
      imageUrl: currentProduct.value.imageUrl as unknown as Url 
    }),
    h(ActionButtons, { 
      isActive: gameState.value === 'playing', 
      onGuess: handleGuess, 
      displayPrice: safeDisplayPrice.value 
    })
  ])
)

const overlay = computed(() => {
  if (gameState.value === 'playing') return null

  // Cast product properties to the expected types
  const price = currentProduct.value.price as unknown as Amount
  const productUrl = currentProduct.value.imageUrl as unknown as Url

  if (gameState.value === 'timeout') {
    return h(TimeoutOverlay, { 
      price, 
      productUrl, 
      onNext: nextProduct, 
      isLastRun: runsLeft.value <= 1 
    })
  }

  if (isCorrect.value) {
    return h(WinOverlay, { 
      price, 
      productUrl, 
      onNext: nextProduct, 
      isLastRun: runsLeft.value <= 1 
    })
  }

  return h(LoseOverlay, { 
    price, 
    productUrl, 
    onNext: nextProduct, 
    isLastRun: runsLeft.value <= 1 
  })
})
</script> 