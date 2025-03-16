<template>
  <div>
    <Card class="w-full overflow-hidden shadow-lg border-2 border-primary/20 bg-card/90 rounded-b-none">
      <div class="relative w-full h-72 md:h-96">
        <img
          :src="imageUrl"
          :alt="name"
          class="object-cover transition-all hover:scale-105 duration-700 absolute inset-0 w-full h-full"
        />
      </div>
    </Card>

    <Card class="w-full rounded-t-none">
      <CardHeader>
        <CardTitle class="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {{ name }}
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '~/components/atoms/card'
import type { Url } from '../../../../back/src/utils/index.type'

defineProps<{
  name: string
  imageUrl: Url
}>()
</script> 