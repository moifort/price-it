<script setup lang="ts">
import Header from '~/components/organisms/game/Header.vue'
import Game from '~/components/template/Game.vue'
import type { Run } from '../../../../back/src/run/types'
import type { Score } from '../../../../back/src/score/types'

const { runsLeft } = defineProps<{ score: Score; runsLeft: Run }>()
defineEmits<(e: 'click:exit') => void>()
</script>

<template>
  <Game>
    <template #header>
      <Header
        :score="score"
        :runsLeft="runsLeft"
        @click:exit="$emit('click:exit')"
        class="mb-3"
      />
    </template>

    <template #body>
      <slot name="body" />
    </template>
  </Game>
</template>
