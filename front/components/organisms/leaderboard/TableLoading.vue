<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import { Card, CardHeader } from '~/components/atoms/card'
</script>


<template>
  <Transition class="fade-in">
    <Card>
      <CardHeader class="flex justify-center items-center min-h-[200px]">
        <Trophy class="w-12 h-12 text-yellow-400 animate-pulse" />
        <div class="mt-2 text-foreground/70 font-medium">Loading...</div>
      </CardHeader>
    </Card>
  </Transition>
</template>

