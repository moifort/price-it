<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import { Card } from '~/components/atoms/card'
</script>


<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex text-2xl items-center"><Trophy class="w-7 h-7 mr-3 text-yellow-500" /> The best of the best </CardTitle>
      <CardDescription>Behold the top <strong>30 champions!</strong> They came, they played, they conquered. Will you rise among the ranks, or forever remain in the shadows of their glory?</CardDescription>
    </CardHeader>
  </Card>
</template>

