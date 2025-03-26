<script setup lang="ts">
import { openLink, openTelegramLink, shareURL } from '@telegram-apps/sdk'
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'

// TODO: Add logic jsute si il clique sur le lien
const { data, status } = useAsyncGql('TaskQuery')
</script>

<template>
  {{ shareURL.isAvailable() }}
  <Button @click="() => shareURL('https://t.me/guessprice_bot?start=ref_1234', 'Invite a friend!')">Referal1</Button>
  <Button @click="() => shareURL('https://t.me/guessprice_bot', 'Invite a friend!')">Referal2</Button>
  <Button @click="() => openLink('https://t.me/guessprice_bot?start=ref_1234')">Referal3</Button>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
  />
</template>
