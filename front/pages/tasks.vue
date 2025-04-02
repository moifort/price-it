<script setup lang="ts">
import Tasks from '~/components/pages/Tasks.vue'
import { Run } from '../../back/src/run/validators'
import { Score } from '../../back/src/score/validators'
import type { Media } from '../../back/src/task/types'
import type { UserId } from '../../back/src/user/types'

const { data, status, refresh } = useAsyncGql('TaskQuery')
const copyInvitationLink = (referrerId: UserId) => {
  const text = 'Join me on Guess Price!'
  const url = `https://t.me/guessprice_bot?start=ref_${referrerId}`
  window.location.href = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  // navigator.clipboard.writeText(url)
  // alert('Invitation link copied!')
}

const join = async (media: Media) => {
  await GqlTaskJoinMedia({ media })
  await new Promise((resolve) => setTimeout(resolve, 2000))
  refresh()
}
</script>

<template>
  <Tasks :score="status === 'success' ? data.me.score : Score(0)"
         :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
         @click:invite="status === 'success' && copyInvitationLink(data.me.id)"
         :friends="status === 'success' ? data.me.affiliation.friends : 0"
         :joined="status === 'success' ? data.me.task.join : []"
         @click:join="(media) => join(media)"
  />
</template>
