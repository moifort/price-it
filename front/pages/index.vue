<script lang="ts" setup>
import { Button } from '@/components/atoms/button'
import { initData, useSignal } from '@telegram-apps/sdk-vue'

const { data, status, refresh } = useAsyncGql({ operation: 'Player' })
const user = useSignal(initData.user)
</script>

<template>
  <h1>Hello {{ user?.firstName ?? ''}} </h1>
  <h3 v-if="status === 'success'">Score: {{ data.me.score }}.</h3>
  <h3 v-else>Pending...</h3>
  <Button @click="() => refresh()"> Moi </Button>
</template>
