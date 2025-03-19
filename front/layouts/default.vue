<template>
  <div class="flex min-h-screen flex-col h-[100vh]">
    <main class="flex-grow h-full pb-20">
      <slot />
    </main>
    <nav class="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
      <div class="flex justify-around items-center h-18 mb-2">
        <NuxtLink to="/" class="flex flex-col items-center justify-center w-full h-full p-1">
          <Gamepad2Icon class="w-6 h-6" />
          <span class="text-xs mt-1">Game</span>
        </NuxtLink>
        <NuxtLink to="/shop" class="flex flex-col items-center justify-center w-full h-full p-1">
          <ShoppingBagIcon class="w-6 h-6" />
          <span class="text-xs mt-1">Shop</span>
        </NuxtLink>
        <NuxtLink to="/top" class="flex flex-col items-center justify-center w-full h-full p-1">
          <TrophyIcon class="w-6 h-6" />
          <span class="text-xs mt-1">Top</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Gamepad2Icon, ShoppingBagIcon, TrophyIcon } from 'lucide-vue-next'
</script>

<style scoped>
.router-link-active {
  @apply text-primary;
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.h-18 {
  height: 4.5rem;
}
</style>
