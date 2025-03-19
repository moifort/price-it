<script setup lang="ts">
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import Timer from '~/components/organisms/game/Timer.vue'
import { getIntPathParam } from '~/composables/useRoute'

type Guess = 'win' | 'lose'

const router = useRouter()
const index = getIntPathParam('id')
const { product, totalTime } = defineProps(['product', 'totalTime'])

const next = async (guess: Guess) => {
  if (guess === 'win') await GqlGameWinCommand()
  if (guess === 'lose') await GqlGameLoseCommand()
  await router.push(`/game/${index + 1}`)
}
const timeout = async () => {
  await GqlGameLoseCommand()
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
          :displayPrice="product.price"
          @click:less="next('lose')"
          @click:exact="next('lose')"
          @click:more="next('win')"
      />
    </div>
  </div>
</template>

