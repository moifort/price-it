<script setup lang="ts">
import { Rocket, Stars, Zap } from 'lucide-vue-next'
import Game from '~/components/template/Game.vue'

const emit = defineEmits<{ complete: () => void }>()
</script>

<template>
  <Game>
    <template #body>
      <div class="flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div class="text-2xl flex items-center gap-3">
          Get ready!
        </div>

        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-48 w-48 rounded-full border-8 border-primary/20"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="h-48 w-48 rounded-full border-8 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"
              style="animation-duration: 1s;"
            ></div>
          </div>
          <div class="h-48 w-48 flex items-center justify-center">
            <span class="text-7xl font-bold text-primary">
               <Counter :from="5" :value="0" :duration="5" @complete="$emit('complete')" />
            </span>
          </div>
        </div>

        <div class="mt-12 flex items-center gap-4">
          <Zap class="h-8 w-8 animate-pulse" />
          <Rocket class="h-10 w-10 text-yellow-500 animate-bounce" />
          <Zap class="h-8 w-8  animate-pulse" />
        </div>
      </div>
    </template>
  </Game>
</template>
