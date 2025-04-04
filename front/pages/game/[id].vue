<script setup lang="ts">
import { ref } from 'vue'
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import LoseModal from '~/components/organisms/game/LoseModal.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import TimeoutModal from '~/components/organisms/game/TimeoutModal.vue'
import Timer from '~/components/organisms/game/Timer.vue'
import WinModal from '~/components/organisms/game/WinModal.vue'
import { getIntPathParam } from '~/composables/useRoute'
import type { GuessId } from '../../../back/src/game-guess/types'
import type { UserGuess } from '../../../back/src/game/types'

// TODO: Think simplifier l'écran, le rendre moins hostère
// TODO: Add le titre en haut de l'écran et le timer sur le coté
// TODO: Add une description en bas
// TODO: Think de retirer les modales
// TODO: Add une animation de bulle qui monte avec les points gagnés ou perdus
// TODO: Add analytics
const router = useRouter()
const { $open } = useNuxtApp()
const index = getIntPathParam('id')
const { product, totalTime } = defineProps(['product', 'totalTime'])
const counterPlay = ref(true)
const next = async (userGuess: UserGuess, guessId: GuessId) => {
  counterPlay.value = false
  const { game } = await GqlGameCommandGuess({ guessId, userGuess })
  await $open(game.guess ? WinModal : LoseModal, { price: product.price, productLink: product.url })
  await router.push(`/game/${index + 1}`)
}

const timeout = async (guessId: GuessId) => {
  await GqlGameCommandLose({ guessId })
  await $open(TimeoutModal, { price: product.price, productLink: product.url })
  await router.push(`/game/${index + 1}`)
}
</script>

<template>
  <div class="flex flex-col h-full gap-4">
    <div class="flex-none">
      <Timer :timer="totalTime" @timeout="timeout(product.id)" :play="counterPlay" />
    </div>

    <div class="flex-grow">
      <ProductCard :name="product.name" :imageUrl="product.image" />
    </div>

    <div class="flex-none">
      <ActionButtons
          :isActive="true"
          :displayPrice="product.displayed"
          @click:less="next('less', product.id)"
          @click:exact="next('exact', product.id)"
          @click:more="next('more', product.id)"
      />
    </div>
  </div>
</template>

