<script setup lang="ts">
import { Check, LoaderCircle, Wallet2 } from 'lucide-vue-next'
import type { WalletId as WalletIdType } from '../../../back/src/airdrop/types'

const { saveWalletId, walletId } = defineProps<{
  walletId: WalletIdType | undefined
  saveWalletId: (wallerId: WalletIdType) => Promise<void>
}>()

const walletIdRef = ref(walletId)
const isSaved = ref(false)
const isLoading = ref(false)
const saveWallet = async (walletId: WalletIdType | undefined) => {
  if (!walletId) return
  isLoading.value = true
  try {
    await saveWalletId(walletId)
    isSaved.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-800 px-4 py-8 text-white overflow-x-hidden">
    <div class="w-full max-w-md flex flex-col items-center">
      <img src="~/assets/images/chest.png" alt="Treasure chest" class="w-48 md:w-56 mb-6" />
      
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-3 leading-tight">
        Participate and earn coins!
      </h1>
      
      <p class="text-xl md:text-2xl font-normal text-center mb-8 leading-snug max-w-xs">
        Airdrop is thaqistrution storlp tulae pre score!
      </p>
      
      <div class="bg-navy-900 w-full p-4 rounded-3xl mb-8 flex items-center shadow-lg">
        <Wallet2 class="size-5 text-yellow-400 mr-3 flex-shrink-0" />
        <input 
          v-model="walletIdRef" 
          type="text" 
          inputmode="text"
          placeholder="Wallet Id" 
          class="w-full bg-transparent border-none text-white text-lg placeholder:text-gray-400 outline-none" 
          autocomplete="off"
        />
        <button 
          v-if="isLoading" 
          disabled 
          class="ml-2 p-2 flex-shrink-0"
          aria-label="Loading"
        >
          <LoaderCircle class="animate-spin duration-500 text-white size-5" />
        </button>
        <button 
          v-else-if="isSaved" 
          class="ml-2 p-2 flex-shrink-0"
          aria-label="Saved"
        >
          <Check class="text-white size-5" />
        </button>
        <button 
          v-else 
          class="ml-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex-shrink-0" 
          @click="saveWallet(walletIdRef)" 
          :disabled="!walletIdRef"
          aria-label="Save wallet ID"
        >
          Save
        </button>
      </div>
      
      <p class="text-lg md:text-xl font-normal text-center leading-relaxed max-w-xs">
        Currently in the mining phase where players map
        <span class="block mt-1">Telegram channel!</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.bg-navy-900 {
  background-color: #141f38;
}

@media screen and (max-width: 768px) {
  input {
    font-size: 16px;
  }
}
</style>
