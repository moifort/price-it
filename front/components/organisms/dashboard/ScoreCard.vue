<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'

defineProps<{ score: number }>()
</script>

<template>
  <Card>
    <CardContent class="pt-6 flex flex-col items-center justify-center gap-2 h-full">
        <Trophy class="w-12 h-12 text-yellow-500"/>
        <h2 class="text-2xl font-semibold text-center">Total Score</h2>
        <p class="text-4xl font-bold text-primary"><Counter :value="score" :duration="2" /></p>
        <p class="text-sm text-muted-foreground">Keep playing to increase your score!</p>
    </CardContent>
  </Card>
</template>


