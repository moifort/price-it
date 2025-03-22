<script setup lang="ts">
import AirdropComponent from '~/components/pages/Airdrop.vue'
import type { WalletId } from '../../back/src/airdrop/types'

const { data, refresh } = useAsyncGql('AirdropQuery')
const save = async (walletId: WalletId) => {
  // TODO: Add analytics
  await GqlAirdropCommandSetWalletId({ walletId })
  await refresh()
}
</script>

<template>
  <AirdropComponent :wallet-id="data?.me.airdrop?.walletId ?? undefined" :save-wallet-id="save"/>
</template>
