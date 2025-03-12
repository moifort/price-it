<script lang="ts" setup>
import { Button } from '@/components/atoms/button'
import { initData, useSignal } from '@telegram-apps/sdk-vue'
import { Point } from '../../back/src/score/validators'

const { data, status, refresh } = useAsyncGql({ operation: 'Player' })

const user = useSignal(initData.user)
</script>

<template>
  <h1>Hello {{ user?.firstName ?? ''}} </h1>
  <h3 v-if="status === 'success'">Score: {{ data.me.score }}.</h3>
  <h3 v-else>Pending...</h3>
  <Button @click="() => refresh()"> Refetche </Button>
  <Button @click="() => GqlPlayerScore({points: Point(10)})"> Increment score </Button>
</template>
