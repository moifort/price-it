<script lang="ts" setup>
import Game from '~/components/pages/Game/Game.vue'
import GameEnd from '~/components/pages/Game/GameEnd.vue'
import GameStart from '~/components/pages/Game/GameStart.vue'
import type { Run } from '../../back/src/run/types'
import { Limit, Seconde } from '../../back/src/utils/validators'

definePageMeta({ layout: 'fullscreen' })

const router = useRouter()
const route = useRoute()
const { data, refresh: refreshStats } = useAsyncGql('GameQuery')
const { status: productStatus, data: guessesData } = useAsyncGql('GameGuessesQuery')
const index = ref(0)
watch(
  () => route.params.id,
  (value) => {
    index.value = Number(value)
    refreshStats()
  },
)
const isStartingFinish = ref(false)
</script>

<template>
  <GameStart v-if="!isStartingFinish && productStatus === 'pending'" @complete="() => isStartingFinish = true" />
  <Game v-else-if="productStatus === 'success' && index < guessesData.game.guesses.length"
          :score="data.me.score"
          :runs-left="data.me.runs.remaining"
          @click:exit="router.push('/')"
    >
      <template #body>
        <NuxtPage
            :product="guessesData.game.guesses[index]"
            :totalTime="Seconde(10)"
            :page-key="index.toString()"
        />
      </template>
    </Game>
    <GameEnd v-else-if="index === guessesData.game.guesses.length" @click:exit="router.push('/')" :score="data.me.score" />
</template>

