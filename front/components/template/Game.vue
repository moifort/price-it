<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="container max-w-screen-md mx-auto p-4 md:p-6 space-y-6">
      <header>
        {{ header }}
      </header>
      
      <main class="flex-1 space-y-6">
        {{ content }}
      </main>
    </div>
    
    <div>
      {{ overlay }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  header: any
  content: any
  overlay?: any
}>()
</script> 