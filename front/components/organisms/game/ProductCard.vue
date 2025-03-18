<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '~/components/atoms/card'
import type { Url } from '../../../../back/src/utils/types'

defineProps<{ name: string; imageUrl: Url }>()
</script>
<template>
  <div class="flex flex-col h-full">
    <Card class="flex-grow shadow-lg border-2 border-primary/20 bg-card/90 rounded-b-none">
      <img
          :src="imageUrl"
          :alt="name"
          class="w-full object-cover min-h-full max-h-20"
      />
    </Card>

    <Card class="rounded-t-none flex-none">
      <CardHeader>
        <CardTitle class="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {{ name }}
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>

