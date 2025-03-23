import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import { AirdropCommand } from '../command'
import type { WalletId as WalletIdType } from '../types'
import { WalletId } from '../validators'

const WalletIdScalar = new GraphQLScalarType({
  name: 'WalletId',
  description: 'The `WalletId` scalar type represents a wallet identifier as a string.',
  parseValue: (value: unknown): WalletIdType => WalletId(value),
  serialize: (value: unknown) => WalletId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? WalletId(ast.value) : null),
})

export const resolvers: Resolvers = {
  WalletId: WalletIdScalar,
  AirdropMutation: {
    updateWalletId: async (_, { walletId }, { database, userId }) => {
      await AirdropCommand.setWalletId(database)(userId, walletId)
      return true
    },
  },
  Mutation: {
    // @ts-ignore
    airdrop: () => ({}),
  },
}
