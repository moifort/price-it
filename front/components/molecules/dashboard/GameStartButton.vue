<script setup lang="ts">
import { Play } from 'lucide-vue-next'

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <Button size="lg" class="w-full gap-2 text-lg h-14 animate-pulse" @click="emit('click')">
    <Play class="w-6 h-6" />
    Start Game
  </Button>
</template>

