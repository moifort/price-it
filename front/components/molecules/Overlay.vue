<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6">
    <div class="bg-card rounded-lg shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
      <div class="flex flex-col items-center text-center gap-4">
        <div class="flex justify-center items-center h-20 w-20 rounded-full bg-card">
          {{ icon }}
        </div>
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">{{ title }}</h2>
          <div class="text-muted-foreground">{{ description }}</div>
        </div>
        <div class="w-full mt-2">
          {{ actions }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: any
  title: any
  description: any
  actions: any
}>()
</script> 