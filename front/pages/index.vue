<script lang="ts" setup>
import { Avatar, AvatarFallback } from '@/components/atoms/avatar'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { Icon } from '@iconify/vue'
import { initData, useSignal } from '@telegram-apps/sdk-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { Point } from '../../back/src/score/validators'

const { data, status, refresh } = useAsyncGql({ operation: 'Player' })
const user = useSignal(initData.user)

const dailyRuns = 10
const maxRuns = 10
const bestTime = '8s'
const score = ref(0)

const hoverEffect = ref(false)

// Score animation variables
const displayScore = ref(0)
const previousScore = ref(0)
const isAnimatingScore = ref(false)

// Watch for score changes to animate
watch(
  () => data.value?.me?.score,
  (newScore, oldScore) => {
    if (newScore !== undefined) {
      // Only animate if this is not the initial data load
      if (oldScore !== undefined && newScore !== oldScore) {
        previousScore.value = oldScore
        animateScoreCounter(oldScore, newScore)
      } else {
        // Set directly without animation for initial load
        displayScore.value = newScore
        score.value = newScore
      }
    }
  },
  { immediate: true }, // Add immediate: true to catch the initial value
)

// Also watch local score ref for testing with +10 button
watch(score, (newScore, oldScore) => {
  if (newScore !== oldScore && oldScore !== 0) {
    previousScore.value = oldScore
    animateScoreCounter(oldScore, newScore)
  }
})

// Initialize displayScore on mount
onMounted(() => {
  // If data is already available, set the score directly without animation
  if (data.value?.me?.score) {
    displayScore.value = data.value.me.score
    score.value = data.value.me.score
  }
})

// Animate score counter
const animateScoreCounter = (from, to) => {
  isAnimatingScore.value = true

  // Start with current value
  displayScore.value = from

  // Calculate increment per step
  const diff = to - from
  const duration = 1000 // ms
  const steps = 20
  const increment = diff / steps

  let currentStep = 0

  const interval = setInterval(() => {
    currentStep++

    if (currentStep >= steps) {
      displayScore.value = to
      clearInterval(interval)
      isAnimatingScore.value = false
    } else {
      displayScore.value = Math.round(from + increment * currentStep)
    }
  }, duration / steps)
}

// Game visual effects
const buttonHovered = ref(false)
const buttonPressed = ref(false)

// Generate colors for icons
const iconColors = {
  trophy: 'text-yellow-400',
  target: 'text-blue-400',
  clock: 'text-green-400',
  play: 'text-red-400',
}
</script>

<template>
  <div class="flex flex-col min-h-screen w-full max-w-md mx-auto p-6  text-foreground dark">
    <!-- App Header -->
    <div class="flex items-center gap-4 mb-4">
      <div class="flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-primary">
          <path d="M7 7.5C7 6.11929 8.11929 5 9.5 5H18.5C19.8807 5 21 6.11929 21 7.5V16.5C21 17.8807 19.8807 19 18.5 19H9.5C8.11929 19 7 17.8807 7 16.5V7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 7.5L3 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 16.5L3 20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 9C12 9.55228 11.5523 10 11 10C10.4477 10 10 9.55228 10 9C10 8.44772 10.4477 8 11 8C11.5523 8 12 8.44772 12 9Z" fill="currentColor"/>
          <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor"/>
          <path d="M11 9L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="19" cy="10" r="2" stroke="currentColor" stroke-width="2"/>
          <path d="M19 8V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M19 13V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-primary">Price It</h1>
    </div>

    <!-- Player Profile Section -->
    <Card class="mb-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card text-card-foreground">
      <CardContent class="p-4">
        <div class="flex items-center gap-4">
          <Avatar class="bg-muted">
            <AvatarFallback class="bg-muted text-xl font-semibold">
              {{ user?.firstName?.[0] ?? 'P' }}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 class="text-lg font-semibold">{{ user?.firstName ?? 'Player' }}</h2>
            <Badge variant="outline" class="mt-1 bg-transparent border-muted-foreground">
              LVL {{ Math.max(1, Math.floor(score / 100)) }}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 gap-3 mb-4">
      <!-- Runs Card -->
      <Card class="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card text-card-foreground">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:target" class="text-2xl drop-shadow" :class="iconColors.target" />
            <div>
              <div class="text-lg font-semibold">{{ dailyRuns }}/{{ maxRuns }}</div>
              <div class="text-xs text-muted-foreground">Daily Runs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Best Time Card -->
      <Card class="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card text-card-foreground">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:clock-outline" class="text-2xl drop-shadow" :class="iconColors.clock" />
            <div>
              <div class="text-lg font-semibold">{{ bestTime }}</div>
              <div class="text-xs text-muted-foreground">Best Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Score Card -->
    <Card class="mb-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card text-card-foreground">
      <CardContent class="p-6 flex flex-col items-center">
        <Icon icon="mdi:trophy-outline" class="text-3xl mb-2 drop-shadow-md" :class="iconColors.trophy" />
        <div
          class="text-4xl font-bold tracking-tight mb-1"
          :class="{ 'animate-pulse': isAnimatingScore }">
          {{ displayScore }}
        </div>
        <div class="text-sm text-muted-foreground">Total Score</div>
      </CardContent>
    </Card>

    <!-- Start Game Button -->
    <Button
      class="w-full py-8 text-xl font-bold relative overflow-hidden group mb-6 shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,0,0,0.8)] transition-all duration-300"
      size="lg"
      variant="default"
      @mouseenter="buttonHovered = true"
      @mouseleave="buttonHovered = false"
      @mousedown="buttonPressed = true"
      @mouseup="buttonPressed = false">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div class="flex items-center justify-center gap-3">
        <Icon icon="mdi:play" class="text-3xl drop-shadow-lg animate-pulse" :class="iconColors.play" />
        <span>Start Game</span>
      </div>
    </Button>

    <!-- Debug buttons -->
    <div class="flex justify-center gap-3 mb-6">
      <Button variant="outline" size="sm" @click="() => refresh()">Refresh</Button>
      <Button variant="outline" size="sm" @click="() => {GqlPlayerScore({points: Point(10)})}">+10 Points</Button>
    </div>
  </div>
</template>

<style scoped>
/* Using only Tailwind classes, no custom CSS needed */
</style>
