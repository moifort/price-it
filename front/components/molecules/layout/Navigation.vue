<script setup lang="ts">
import { Gamepad2Icon, ShoppingBagIcon, TrophyIcon } from 'lucide-vue-next'
import { computed } from 'vue'

export type Menu = 'game' | 'shop' | 'top'
defineProps<{ active: Menu }>()
defineEmits<(e: 'click:goTo', active: Menu) => void>()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
    <div class="flex justify-around items-center h-18">
      <div
        class="flex flex-col items-center justify-center w-full h-full p-1 cursor-pointer"
        :class="[
          active === 'game'
            ? 'text-primary font-medium bg-primary/10 rounded-md scale-105 shadow-sm'
            : 'text-foreground/70 hover:text-foreground/90'
        ]"
        @click="$emit('click:goTo', 'game')"
      >
        <Gamepad2Icon class="w-6 h-6" />
        <span class="text-xs mt-1">Game</span>
      </div>
      <div
        class="flex flex-col items-center justify-center w-full h-full p-1 cursor-pointer"
        :class="[
          active === 'shop'
            ? 'text-primary font-medium bg-primary/10 rounded-md scale-105 shadow-sm'
            : 'text-foreground/70 hover:text-foreground/90'
        ]"
        @click="$emit('click:goTo', 'shop')"
      >
        <ShoppingBagIcon class="w-6 h-6" />
        <span class="text-xs mt-1">Shop</span>
      </div>
      <div
        class="flex flex-col items-center justify-center w-full h-full p-1 cursor-pointer"
        :class="[
          active === 'top'
            ? 'text-primary font-medium bg-primary/10 rounded-md scale-105 shadow-sm'
            : 'text-foreground/70 hover:text-foreground/90'
        ]"
        @click="$emit('click:goTo', 'top')"
      >
        <TrophyIcon class="w-6 h-6" />
        <span class="text-xs mt-1">Top</span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.h-18 {
  height: 4.5rem;
}
</style>
