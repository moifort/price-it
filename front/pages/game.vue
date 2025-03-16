<template>
  <Game :onNavigateHome="navigateHome" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Game from '~/components/pages/Game.vue'

const router = useRouter()

const navigateHome = () => {
  router.push('/')
}
</script> 