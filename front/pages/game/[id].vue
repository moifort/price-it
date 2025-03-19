<script setup lang="ts">
import ActionButtons from '~/components/organisms/game/ActionButtons.vue'
import ProductCard from '~/components/organisms/game/ProductCard.vue'
import Timer from '~/components/organisms/game/Timer.vue'
import { getIntPathParam } from '~/composables/useRoute'

const router = useRouter()
const index = getIntPathParam('id')

const { product, totalTime } = defineProps(['product', 'totalTime'])
const isTimeout = ref(false)
</script>

<template>
  <div class="flex flex-col h-full gap-4">
    <div class="flex-none">
      <Timer :timer="totalTime" @timeout="() => isTimeout = true" />
    </div>

    <div class="flex-grow">
      <ProductCard :name="product.name" :imageUrl="product.image" />
    </div>

    <div class="flex-none">
      <ActionButtons
          :isActive="!isTimeout"
          :displayPrice="product.price"
          @click:less="router.push(`/game/${index + 1}`)"
          @click:exact="router.push(`/game/${index + 1}`)"
          @click:more="router.push(`/game/${index + 1}`)"
      />
    </div>
  </div>
</template>

