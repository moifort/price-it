<script setup lang="ts">
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { UserId } from '../../back/src/user/types'

// TODO: Add logic juste si il clique sur le lien
const { data, status } = useAsyncGql('TaskQuery')
const copyInvitationLink = (referrerId: UserId) => {
  // TODO: faire marcher le partage
  navigator.clipboard.writeText(`https://t.me/guessprice_bot?start=ref_${referrerId}`)
  alert('Invitation link copied!')
}
</script>

<template>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
         @click:invite="status === 'success' && copyInvitationLink(data.me.id)"
         :friends="status === 'success' ? data.me.affiliation.friends : 0"
         :joined="status === 'success' ? data.me.task.join : []"
         @click:join="status === 'success' && copyInvitationLink(data.me.id)"
  />
</template>
