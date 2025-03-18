<script setup lang="ts">
import { useRouteHelper } from '~/composables/useRoute'
const { getIntPathParam } = useRouteHelper()
const index = getIntPathParam('id')
const { product } = defineProps(['product', 'next'])
const router = useRouter()
</script>

<template>
  <div>
   <h1> {{ index }}</h1>
    {{ product }}
    <br>
    <Button @click="router.push(`/game/${index + 1}`)">Next</Button>
  </div>
</template>

