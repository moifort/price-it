import type { Meta, StoryObj } from '@storybook/vue3'
import { WalletId } from '../../../back/src/airdrop/validators'
import component from './Airdrop.vue'

const meta: Meta<typeof component> = { component }
export default meta
type Story = StoryObj<typeof component>

export const Default: Story = {
  args: {
    walletId: WalletId('default-wallet-id'),
    saveWalletId: async (_walletId) => new Promise((resolve) => setTimeout(resolve, 1500)),
  },
}
