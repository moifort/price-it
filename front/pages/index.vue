<script lang="ts" setup>
import { Button } from '@/components/atoms/button'
import { Icon } from '@iconify/vue'
import { initData, useSignal } from '@telegram-apps/sdk-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { Point } from '../../back/src/score/validators'

const { data, status, refresh } = useAsyncGql({ operation: 'Player' })
const user = useSignal(initData.user)

const dailyRuns = 10

const maxRuns = 10
const bestTime = '8s'
const score = ref(233)
const hoverEffect = ref(false)

// Score animation variables
const displayScore = ref(0)
const previousScore = ref(0)
const isAnimatingScore = ref(false)

// Watch for score changes to animate
watch(
  () => data.value?.me?.score,
  (newScore, oldScore) => {
    if (newScore !== undefined && oldScore !== undefined && newScore !== oldScore) {
      previousScore.value = oldScore
      animateScoreCounter(oldScore, newScore)
    }
  },
)

// Also watch local score ref for testing with +10 button
watch(score, (newScore, oldScore) => {
  if (newScore !== oldScore) {
    previousScore.value = oldScore
    animateScoreCounter(oldScore, newScore)
  }
})

// Initialize displayScore on mount
onMounted(() => {
  if (data.value?.me?.score) {
    displayScore.value = data.value.me.score
  } else {
    displayScore.value = score.value
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

// Generate random colors for pixel character parts
const characterColors = {
  body: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
  eyes: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
  hair: `hsl(${Math.floor(Math.random() * 360)}, 70%, 40%)`,
}
</script>

<template>
  <div class="game-container">
    <!-- Pixel art background elements -->
    <div class="pixel-stars"></div>
    <div class="pixel-clouds"></div>

    <div class="game-content">
      <!-- App Header with pixel art logo -->
      <div class="game-header">
        <div class="pixel-logo">
          <h1 class="game-title">Price <span class="game-title-accent">It!</span></h1>
          <Icon icon="mdi:star" class="star-icon" />
        </div>
      </div>

      <div class="game-dashboard">
        <!-- Single column for all game widgets -->
        <div class="dashboard-left">
          <!-- Player profile with character -->
          <div class="player-profile">
            <div class="pixel-character">
              <!-- Pixel art character parts -->
              <div class="pixel-character-hair" :style="{ backgroundColor: characterColors.hair }"></div>
              <div class="pixel-character-head"></div>
              <div class="pixel-character-eyes" :style="{ backgroundColor: characterColors.eyes }"></div>
              <div class="pixel-character-body" :style="{ backgroundColor: characterColors.body }"></div>
              <div class="pixel-character-legs"></div>
            </div>
            <div class="player-info">
              <h2 class="player-name">{{ user?.firstName ?? 'Player' }}</h2>
              <div class="player-level">
                <span class="level-value">LVL {{ Math.max(1, Math.floor(score / 100)) }}</span>
              </div>
            </div>
          </div>

          <!-- Stats Mini Cards -->
          <div class="stats-mini-cards">
            <div class="stat-mini-card">
              <div class="mini-card-icon">
                <div class="pixel-target"></div>
              </div>
              <div class="mini-card-value">{{ dailyRuns }}/{{ maxRuns }}</div>
              <div class="mini-card-label">Runs</div>
            </div>

            <div class="stat-mini-card">
              <div class="mini-card-icon">
                <div class="pixel-clock"></div>
              </div>
              <div class="mini-card-value">{{ bestTime }}</div>
              <div class="mini-card-label">Best</div>
            </div>
          </div>

          <!-- Score display -->
          <div class="score-display">
            <div class="pixel-trophy"></div>

            <!-- Score with animated counter when data is loaded -->
            <div class="score-value" :class="{ 'score-animating': isAnimatingScore }">
              {{ displayScore }}
            </div>


            <div class="score-label">Total Score</div>
            <div class="score-particles" v-if="hoverEffect"></div>
          </div>

          <!-- Start Game Button -->
          <Button
            class="start-game-button"
            :class="{ 'button-hovered': buttonHovered, 'button-pressed': buttonPressed }"
            @mouseenter="buttonHovered = true"
            @mouseleave="buttonHovered = false"
            @mousedown="buttonPressed = true"
            @mouseup="buttonPressed = false"
          >
            <div class="pixel-play-icon"></div>
            <span>Start Game</span>
          </Button>
        </div>
      </div>

      <!-- Debug buttons (with pixel style) -->
      <div class="debug-buttons">
        <Button variant="outline" size="sm" class="debug-button" @click="() => refresh()">Refresh</Button>
        <Button variant="outline" size="sm" class="debug-button" @click="() => {GqlPlayerScore({points: Point(10)})}">+10 Points</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Game container with pixel art background */
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0a0a12;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(30, 30, 60, 0.1),
    rgba(30, 30, 60, 0.1) 2px,
    transparent 2px,
    transparent 4px
  );
  padding: 0.5rem;
  position: relative;
  overflow: hidden;
}

/* Pixel art stars in background */
.pixel-stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #ffffaa, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 120px, #ffffaa, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: twinkle 4s infinite;
  opacity: 0.7;
}

/* Pixel clouds in background */
.pixel-clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 25 L20 25 L20 30 L25 30 L25 25 L30 25 L30 20 L25 20 L25 15 L20 15 L20 20 L15 20 Z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E");
  animation: floatClouds 120s infinite linear;
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  gap: 0.75rem;
  z-index: 1;
  height: 100vh;
  max-height: 100vh;
  box-sizing: border-box;
  padding: 0.75rem;
}

/* Game header with pixel art styling */
.game-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.pixel-logo {
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #2a2a5a;
  box-shadow: 0 0 10px rgba(50, 100, 255, 0.3),
              0 0 20px rgba(50, 100, 255, 0.1);
  position: relative;
}

.game-title {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  font-weight: 900;
  color: white;
  text-shadow:
    2px 2px 0 #000,
    -1px -1px 0 #5d5dff,
    1px 1px 3px rgba(60, 60, 255, 0.6);
  letter-spacing: -1px;
  margin: 0;
}

.game-title-accent {
  color: #5dffff;
  text-shadow:
    2px 2px 0 #000,
    -1px -1px 0 #5dffff,
    1px 1px 3px rgba(60, 255, 255, 0.6);
}

.star-icon {
  color: #ffcc00;
  font-size: 2rem;
  filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.7));
  animation: pulse 2s infinite;
  margin-left: 0.5rem;
}

/* New dashboard layout */
.game-dashboard {
  display: flex;
  width: 100%;
  gap: 0.75rem;
  margin-top: 0.25rem;
  flex: 1;
  min-height: 0;
  max-height: calc(100vh - 140px);
}

.dashboard-left {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Player profile styling */
.player-profile {
  background: linear-gradient(135deg, rgba(40, 40, 80, 0.9), rgba(30, 30, 50, 0.95));
  border: 2px solid #3a3a7c;
  border-radius: 0.75rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.player-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.pixel-character {
  position: relative;
  width: 40px;
  height: 40px;
  transform-style: preserve-3d;
  animation: characterBounce 2s infinite;
}

/* Pixel art character parts - scaled down */
.pixel-character-head {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #ffddbb;
  border: 1px solid #000;
  border-radius: 3px;
  top: 5px;
  left: 12px;
}

.pixel-character-hair {
  position: absolute;
  width: 18px;
  height: 7px;
  border: 1px solid #000;
  border-radius: 3px 3px 0 0;
  top: 2px;
  left: 11px;
  z-index: 1;
}

.pixel-character-eyes {
  position: absolute;
  width: 10px;
  height: 3px;
  background-color: #fff;
  border: 1px solid #000;
  top: 10px;
  left: 14px;
  z-index: 2;
}

.pixel-character-body {
  position: absolute;
  width: 18px;
  height: 12px;
  border: 1px solid #000;
  border-radius: 2px;
  top: 20px;
  left: 11px;
}

.pixel-character-legs {
  position: absolute;
  width: 14px;
  height: 6px;
  background-color: #3366cc;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  top: 32px;
  left: 13px;
}

.player-info {
  flex: 1;
  min-width: 0;
}

.player-name {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 0 #000;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-level {
  margin-top: 0.1rem;
}

.level-value {
  display: inline-block;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  font-weight: bold;
  color: #55aaff;
  background-color: rgba(0, 40, 80, 0.4);
  padding: 0.1rem 0.25rem;
  border-radius: 3px;
  border: 1px solid #3370cc;
  text-shadow: 1px 1px 0 #000;
}

/* Stats mini cards */
.stats-mini-cards {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.stat-mini-card {
  flex: 1;
  background: linear-gradient(135deg, rgba(40, 40, 80, 0.9), rgba(30, 30, 50, 0.95));
  border: 2px solid #3a3a7c;
  border-radius: 0.75rem;
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-mini-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.mini-card-icon {
  margin-bottom: 0.3rem;
}

.pixel-target, .pixel-clock {
  width: 30px;
  height: 30px;
  background-size: cover;
}

.pixel-target {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 8h8v8H8z' fill='%234080ff'/%3E%3Cpath d='M6 6h12v2H6zM6 16h12v2H6zM6 8v8h2V8zM16 8v8h2V8z' fill='%234080ff'/%3E%3Cpath d='M10 10h4v4h-4z' fill='%23ffffff'/%3E%3Cpath d='M11 11h2v2h-2z' fill='%234080ff'/%3E%3C/svg%3E");
}

.pixel-clock {
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='6' fill='%2340ff80' fill-opacity='0.8'/%3E%3Cpath d='M10 10h4v4h-4z' fill='%2340ff80' fill-opacity='0.4'/%3E%3Cpath d='M11 6h2v2h-2zM11 16h2v2h-2zM16 11h2v2h-2zM6 11h2v2h-2zM12 12v-4h-1v5h4v-1z' fill='%23ffffff'/%3E%3C/svg%3E");
}

.mini-card-value {
  font-family: 'Courier New', monospace;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 0 #000;
}

.mini-card-label {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #8899cc;
  text-shadow: 1px 1px 0 #000;
  margin-top: 0.2rem;
}

/* Score display */
.score-display {
  flex: 0.8;
  background: linear-gradient(135deg, rgba(40, 40, 80, 0.9), rgba(30, 30, 50, 0.95));
  border: 2px solid #3a3a7c;
  border-radius: 0.75rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.score-display:hover {
  transform: translateY(-2px) rotateX(3deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.pixel-trophy {
  width: 30px;
  height: 30px;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 10h10v2.5h2.5v2.5h2.5v7.5h-2.5v2.5h-5v10h-5V25h-5v-2.5h-2.5V12.5h2.5V10h2.5z' fill='%23ffcc00'/%3E%3Cpath d='M17.5 12.5h5v2.5h2.5v5h-2.5v2.5h-5v-2.5h-2.5v-5h2.5z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E");
  margin-bottom: 0.25rem;
  filter: drop-shadow(0 0 3px rgba(255, 204, 0, 0.5));
}

.score-value {
  font-family: 'Courier New', monospace;
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffcc00;
  text-shadow:
    0 0 8px rgba(255, 204, 0, 0.6),
    2px 2px 0 #000;
  margin-bottom: 0.25rem;
  position: relative;
}

/* Score animation */
.score-animating {
  animation: scoreCounterPulse 0.2s ease-in-out;
}

/* Score loading animation */
.score-loading {
  height: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.pixel-loader {
  width: 24px;
  height: 24px;
  background-color: #5d5dff;
  clip-path: polygon(
    0% 0%, 25% 0%, 25% 25%, 50% 25%, 50% 0%, 75% 0%, 75% 25%,
    100% 25%, 100% 50%, 75% 50%, 75% 75%, 100% 75%, 100% 100%,
    75% 100%, 75% 75%, 50% 75%, 50% 100%, 25% 100%, 25% 75%,
    0% 75%, 0% 50%, 25% 50%, 25% 25%, 0% 25%
  );
  animation: loaderRotate 2s infinite;
}

.pixel-loader-dots {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.loader-dot {
  width: 6px;
  height: 6px;
  background-color: #ffcc00;
  border-radius: 2px;
}

.loader-dot:nth-child(1) {
  animation: dotBlink 1.5s infinite 0s;
}

.loader-dot:nth-child(2) {
  animation: dotBlink 1.5s infinite 0.3s;
}

.loader-dot:nth-child(3) {
  animation: dotBlink 1.5s infinite 0.6s;
}

.score-label {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #aaccff;
  text-align: center;
  font-weight: 500;
  text-shadow: 1px 1px 0 #000;
}

.score-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20% 30%, #ffcc00, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40% 70%, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 60% 50%, #ffcc00, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80% 40%, #ffffff, rgba(0,0,0,0));
  transform: translate(-50%, -50%);
  animation: scoreParticles 1s ease-out;
}

/* Start Game Button with pixel art styling */
.start-game-button {
  width: 100%;
  height: 3rem;
  background: linear-gradient(to bottom, #ff4040, #cc2020);
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 0 #000;
  border: 2px solid #ff6060;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow:
    0 4px 0 #801010,
    0 8px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  position: relative;
  overflow: hidden;
}

.start-game-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent);
  transition: left 0.5s ease;
}

.button-hovered::before {
  left: 100%;
  transition: left 0.5s ease;
}

.button-pressed {
  transform: translateY(3px);
  box-shadow:
    0 1px 0 #801010,
    0 4px 8px rgba(0, 0, 0, 0.4);
}

.pixel-play-icon {
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 5v10l8-5z' fill='%23ffffff'/%3E%3C/svg%3E");
}

/* Debug buttons with pixel art styling */
.debug-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.debug-button {
  background-color: rgba(40, 40, 80, 0.6);
  border: 2px solid #5050a0;
  color: #aaccff;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  text-shadow: 1px 1px 0 #000;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
  height: auto;
}

.debug-button:hover {
  background-color: rgba(50, 50, 100, 0.8);
  border-color: #6060c0;
  transform: translateY(-2px);
}

.debug-button:active {
  transform: translateY(0);
}

/* Fix iOS Safari 100vh issue */
@supports (-webkit-touch-callout: none) {
  .game-container, .game-content {
    min-height: -webkit-fill-available;
  }
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}

@keyframes floatClouds {
  from { background-position: 0 0; }
  to { background-position: 1000px 0; }
}

@keyframes scoreParticles {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}

@keyframes characterBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}

@keyframes scoreCounterPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); color: #ffd700; text-shadow: 0 0 15px rgba(255, 204, 0, 0.8), 2px 2px 0 #000; }
  100% { transform: scale(1); }
}

@keyframes loaderRotate {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}

@keyframes dotBlink {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}
</style>
