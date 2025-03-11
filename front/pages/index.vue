<script lang="ts" setup>
import { Button } from '@/components/atoms/button'
import { initData, useSignal } from '@telegram-apps/sdk-vue'

const user = useSignal(initData.user)
</script>

<template>
  <h1>Hello {{ user?.firstName ?? '' }}</h1>
  <Button>Moi</Button>
</template>
