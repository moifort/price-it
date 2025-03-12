<script lang="ts" setup>
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { Progress } from '@/components/atoms/progress'
import { Icon } from '@iconify/vue'
import { initData, useSignal } from '@telegram-apps/sdk-vue'
import { computed, ref } from 'vue'
import { Point } from '../../back/src/score/validators'

const { data, status, refresh } = useAsyncGql({ operation: 'Player' })

const user = useSignal(initData.user)

const dailyRuns = 10

const maxRuns = 10
const bestTime = '8s'
const score = ref(233)
const hoverEffect = ref(false)

// Game visual effects
const buttonHovered = ref(false)
const buttonPressed = ref(false)
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

      <!-- Score Card with pixel art trophy -->
      <Card class="score-card">
        <CardHeader class="score-header">
          <div class="pixel-trophy"></div>
          <CardTitle class="score-title">Total Score</CardTitle>
        </CardHeader>
        <CardContent class="score-content">
          <div class="score-value">{{ score }}</div>
          <div class="score-particles" v-if="hoverEffect"></div>
          <p class="score-message">Keep playing to increase your score!</p>
        </CardContent>
      </Card>

      <!-- Stats Grid with pixel art icons -->
      <div class="stats-grid">
        <!-- Daily Runs Card -->
        <Card class="stats-card daily-runs-card">
          <CardContent class="stats-content">
            <div class="pixel-target"></div>
            <h2 class="stats-title">Daily Runs</h2>
            <div class="stats-value">
              <span class="current-value">{{ dailyRuns }}</span>
              <span class="max-value">/{{ maxRuns }}</span>
            </div>
            <Progress :value="(dailyRuns/maxRuns) * 100" class="stats-progress" />
          </CardContent>
        </Card>

        <!-- Best Time Card -->
        <Card class="stats-card best-time-card">
          <CardContent class="stats-content">
            <div class="pixel-clock"></div>
            <h2 class="stats-title">Best Time</h2>
            <div class="stats-value time-value">
              <span>{{ bestTime }}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Start Game Button with pixel art play icon -->
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

      <!-- Debug buttons (with pixel style) -->
      <div class="debug-buttons">
        <Button variant="outline" size="sm" class="debug-button" @click="() => refresh()">Refresh</Button>
        <Button variant="outline" size="sm" class="debug-button" @click="() => {GqlPlayerScore({points: Point(10)}); score += 10; hoverEffect = true; setTimeout(() => hoverEffect = false, 1000);}">+10 Points</Button>
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
  padding: 1rem;
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
  justify-content: center;
  width: 100%;
  max-width: 480px;
  gap: 1.5rem;
  z-index: 1;
}

/* Game header with pixel art styling */
.game-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.5rem;
}

.pixel-logo {
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid #2a2a5a;
  box-shadow: 0 0 10px rgba(50, 100, 255, 0.3),
              0 0 20px rgba(50, 100, 255, 0.1);
  position: relative;
}

.game-title {
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #5d5dff,
    2px 2px 4px rgba(60, 60, 255, 0.6);
  letter-spacing: -1px;
}

.game-title-accent {
  color: #5dffff;
  text-shadow:
    3px 3px 0 #000,
    -1px -1px 0 #5dffff,
    2px 2px 4px rgba(60, 255, 255, 0.6);
}

.star-icon {
  color: #ffcc00;
  font-size: 2.5rem;
  filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.7));
  animation: pulse 2s infinite;
  margin-left: 0.5rem;
}

/* Score card with pixel art styling */
.score-card {
  width: 100%;
  border: 3px solid #3a3a7c;
  background: linear-gradient(135deg, rgba(40, 40, 80, 0.9), rgba(30, 30, 50, 0.95));
  backdrop-filter: blur(10px);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(80, 80, 255, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
}

.score-card:hover {
  transform: translateY(-5px) rotateX(5deg);
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(100, 100, 255, 0.4);
}

.score-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 2px dashed rgba(100, 100, 200, 0.3);
}

.pixel-trophy {
  width: 64px;
  height: 64px;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 16h16v4h4v4h4v12h-4v4h-8v16h-8V40h-8v-4h-4V20h4v-4h4z' fill='%23ffcc00'/%3E%3Cpath d='M28 20h8v4h4v8h-4v4h-8v-4h-4v-8h4z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E");
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.5));
}

.score-title {
  font-family: 'Courier New', monospace;
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 0 #000;
}

.score-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
}

.score-value {
  font-family: 'Courier New', monospace;
  font-size: 5rem;
  font-weight: 900;
  color: #ffcc00;
  text-shadow:
    0 0 10px rgba(255, 204, 0, 0.7),
    3px 3px 0 #000;
  margin-bottom: 1rem;
  position: relative;
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

.score-message {
  font-family: 'Courier New', monospace;
  color: #aaccff;
  text-align: center;
  font-weight: 500;
  text-shadow: 1px 1px 0 #000;
}

/* Stats grid with pixel art styling */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.stats-card {
  border: 3px solid #3a3a7c;
  background: linear-gradient(135deg, rgba(40, 40, 80, 0.9), rgba(30, 30, 50, 0.95));
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(80, 80, 255, 0.3);
}

.daily-runs-card:hover {
  border-color: #3a5a9c;
}

.best-time-card:hover {
  border-color: #3a9c5a;
}

.stats-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pixel-target {
  width: 48px;
  height: 48px;
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 16h16v16H16z' fill='%234080ff'/%3E%3Cpath d='M12 12h24v4H12zM12 32h24v4H12zM12 16v16h4V16zM32 16v16h4V16z' fill='%234080ff'/%3E%3Cpath d='M20 20h8v8h-8z' fill='%23ffffff'/%3E%3Cpath d='M22 22h4v4h-4z' fill='%234080ff'/%3E%3C/svg%3E");
  margin-bottom: 0.5rem;
}

.pixel-clock {
  width: 48px;
  height: 48px;
  background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='12' fill='%2340ff80' fill-opacity='0.8'/%3E%3Cpath d='M20 20h8v8h-8z' fill='%2340ff80' fill-opacity='0.4'/%3E%3Cpath d='M22 12h4v4h-4zM22 32h4v4h-4zM32 22h4v4h-4zM12 22h4v4h-4zM24 24v-8h-2v10h8v-2z' fill='%23ffffff'/%3E%3C/svg%3E");
  margin-bottom: 0.5rem;
}

.stats-title {
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 0 #000;
  margin-bottom: 0.5rem;
}

.stats-value {
  font-family: 'Courier New', monospace;

  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.current-value {
  font-size: 2.75rem;
  font-weight: bold;
  color: #4080ff;
  text-shadow: 2px 2px 0 #000;
}

.max-value {
  font-size: 1.5rem;
  color: #7a7a9a;
  margin-bottom: 0.25rem;
}

.time-value {
  font-size: 2.75rem;
  font-weight: bold;
  color: #40ff80;
  text-shadow: 2px 2px 0 #000;
}

.stats-progress {
  height: 8px;
  width: 100%;
  margin-top: 0.5rem;
  background-color: rgba(40, 40, 80, 0.5);
  border: 1px solid #4080ff;
}

/* Start Game Button with pixel art styling */
.start-game-button {
  width: 100%;
  height: 4rem;
  background: linear-gradient(to bottom, #ff4040, #cc2020);
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000;
  border: 3px solid #ff6060;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow:
    0 6px 0 #801010,
    0 10px 20px rgba(0, 0, 0, 0.4);
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
  transform: translateY(4px);
  box-shadow:
    0 2px 0 #801010,
    0 5px 10px rgba(0, 0, 0, 0.4);
}

.pixel-play-icon {
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 6v12l10-6z' fill='%23ffffff'/%3E%3C/svg%3E");
}

/* Debug buttons with pixel art styling */
.debug-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.debug-button {
  background-color: rgba(40, 40, 80, 0.6);
  border: 2px solid #5050a0;
  color: #aaccff;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  text-shadow: 1px 1px 0 #000;
  transition: all 0.2s ease;
}

.debug-button:hover {
  background-color: rgba(50, 50, 100, 0.8);
  border-color: #6060c0;
  transform: translateY(-2px);
}

.debug-button:active {
  transform: translateY(0);
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
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
</style>
