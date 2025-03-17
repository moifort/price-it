<script lang="ts" setup>
import Game from '~/components/pages/Game.vue'
import GameLoading from '~/components/pages/GameLoading.vue'
import { Amount, Seconde, Url } from '../../back/src/utils/validators'

const router = useRouter()
const { data, status } = useAsyncGql({ operation: 'Game' })
const isStartingFinish = ref(false)
</script>

<template>
  <Game v-if="status === 'success' && isStartingFinish"
        :score="data.me.score"
        :display-price="Amount(100)"
        :product-image-url="Url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop')"
        product-name="Chaussette"
        :runs-left="data.me.runs.remaining"
        :total-time="Seconde(10)"
        @click:exit="router.push('/')"
  />
  <GameLoading v-else @complete="() => isStartingFinish = true" />
</template>

