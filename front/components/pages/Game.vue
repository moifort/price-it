<script setup lang="ts">
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import Header from '~/components/organisms/game/Header.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import Timer from '~/components/organisms/game/Timer.vue'
import Game from '~/components/template/Game.vue'
import type { Run } from '../../../back/src/run/types'
import type { Score } from '../../../back/src/score/types'
import type { Amount, Seconde, Url } from '../../../back/src/utils/types'

const { runsLeft } = defineProps<{
  score: Score
  runsLeft: Run
  totalTime: Seconde
  productName: string
  productImageUrl: Url
  displayPrice: Amount
}>()

defineEmits<{
  (e: 'click:exit'): void
  (e: 'click:less'): void
  (e: 'click:exact'): void
  (e: 'click:more'): void
}>()

const isTimeout = ref(false)
const noMoreRuns = computed(() => runsLeft === 0)
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
      <Timer :timer="totalTime" @timeout="() => isTimeout = true" />
    </template>

    <template #body>
        <ProductCard :name="productName" :imageUrl="productImageUrl" />
    </template>

    <template #actions>
      <ActionButtons
        :isActive="!isTimeout && !noMoreRuns"
        :displayPrice="displayPrice"
        @click:less="$emit('click:less')"
        @click:exact="$emit('click:exact')"
        @click:more="$emit('click:more')"
      />
    </template>
  </Game>
</template>
