<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import { Card, CardHeader } from '~/components/atoms/card'
</script>


<template>
  <Card>
    <CardHeader class="flex justify-center items-center min-h-[200px]">
      <Trophy class="w-12 h-12 text-yellow-400 animate-pulse" />
    </CardHeader>
  </Card>
</template>

