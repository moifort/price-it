<script setup lang="ts">
import { Check, LoaderCircle, Wallet2 } from 'lucide-vue-next'
import { Card } from '~/components/atoms/card'
import MainTemplate from '~/components/template/Main.vue'
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
  <MainTemplate>
    <template #title>
      <h1 class="text-3xl font-medium opacity-60">Airdrop</h1>
    </template>

    <template #body>
      <font-awesome :icon="['fas', 'piggy-bank']" size="3x">
        1990980$
      </font-awesome>
      <Card>
        <CardHeader>
          <CardTitle class="flex text-2xl items-center">Participate and earn coins ! </CardTitle>
          <CardDescription>An airdrop is the distribution of tokens to players' wallets. These tokens will be exchanged on the main exchanges, and you can either sell them or keep them. To receive your tokens, you need to complete the two tasks above.</CardDescription>
          <CardDescription>
            <div class="flex w-full max-w items-center gap-1.5 my-2">
              <div class="relative w-full max-w items-center">
                <Input v-model="walletIdRef" type="text" placeholder="Wallet Id" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Wallet2 class="size-5 text-muted-foreground" />
                </span>
              </div>
              <Button v-if="isLoading" disabled class="w-16"> <LoaderCircle class="animate-spin duration-500"/> </Button>
              <Button v-else-if="isSaved" class="w-16"> <Check/> </Button>
              <Button v-else class="w-16" @click="saveWallet(walletIdRef)" :disabled="!walletIdRef"> Save </Button>
            </div>

          </CardDescription>
          <CardDescription>We are currently in the mining phase where all players earn more <strong>points</strong> for the airdrop. The Airdrop date will be announced soon on our Telegram channel.</CardDescription>
        </CardHeader>
      </Card>
    </template>
  </MainTemplate>
</template>
