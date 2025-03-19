<script setup lang="ts">
import { ClipboardListIcon, Gamepad2Icon, ShoppingBagIcon, TrophyIcon } from 'lucide-vue-next'

export type Menu = 'game' | 'shop' | 'top' | 'tasks'
defineProps<{ active: Menu }>()
defineEmits<(e: 'click:goTo', active: Menu) => void>()

const menus = [
  {
    id: 'game' as const,
    icon: Gamepad2Icon,
    label: 'Game',
  },
  {
    id: 'tasks' as const,
    icon: ClipboardListIcon,
    label: 'Tasks',
  },
  {
    id: 'shop' as const,
    icon: ShoppingBagIcon,
    label: 'Shop',
  },
  {
    id: 'top' as const,
    icon: TrophyIcon,
    label: 'Top',
  },
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
    <div class="flex justify-around items-center h-[85px]">
      <div
        v-for="{id, icon, label} in menus"
        :key="id"
        class="flex flex-col items-center justify-center w-full h-full  cursor-pointer pb-4"
        :class="[
          active === id
            ? 'text-primary font-medium bg-primary/10 rounded-md scale-100 shadow-sm'
            : 'text-foreground/70 hover:text-foreground/90'
        ]"
        @click="$emit('click:goTo', id)"
      >
        <component :is="icon" class="w-6 h-6" />
        <span class="text-xs mt-1">{{ label }}</span>
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
