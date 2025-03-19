<script setup lang="ts">
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import LoseModal from '~/components/organisms/game/LoseModal.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import TimeoutModal from '~/components/organisms/game/TimeoutModal.vue'
import Timer from '~/components/organisms/game/Timer.vue'
import WinModal from '~/components/organisms/game/WinModal.vue'
import { getIntPathParam } from '~/composables/useRoute'
import { generate } from '~/utils/game'

type Guess = 'win' | 'lose'

const router = useRouter()
const { $open } = useNuxtApp()
const index = getIntPathParam('id')
const { product, totalTime } = defineProps(['product', 'totalTime'])
const { displayPrice, expectedGuess } = generate(product.price)
const next = async (playerGuess: 'less' | 'exact' | 'more') => {
  const guess: Guess = playerGuess === expectedGuess ? 'win' : 'lose'
  if (guess === 'win') {
    await GqlGameWinCommand()
    await $open(WinModal, { price: product.price, productLink: product.url })
  }
  if (guess === 'lose') {
    await GqlGameLoseCommand()
    await $open(LoseModal, { price: product.price, productLink: product.url })
  }
  await router.push(`/game/${index + 1}`)
}

const timeout = async () => {
  await GqlGameLoseCommand()
  await $open(TimeoutModal, { price: product.price, productLink: product.url })
  await router.push(`/game/${index + 1}`)
}
</script>

<template>
  <div class="flex flex-col h-full gap-4">
    <div class="flex-none">
      <Timer :timer="totalTime" @timeout="timeout()" />
    </div>

    <div class="flex-grow">
      <ProductCard :name="product.name" :imageUrl="product.image" />
    </div>

    <div class="flex-none">
      <ActionButtons
          :isActive="true"
          :displayPrice="displayPrice"
          @click:less="next('less')"
          @click:exact="next('exact')"
          @click:more="next('more')"
      />
    </div>
  </div>
</template>

