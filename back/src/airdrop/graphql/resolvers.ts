import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'
import type { Resolvers } from '../../api/__generated__/types'
import type { WalletId as WalletIdType } from '../types'
import { validateWalletId } from '../validators'

const WalletIdScalar = new GraphQLScalarType({
  name: 'WalletId',
  description: 'The `WalletId` scalar type represents a wallet identifier as a string.',
  parseValue: (value: unknown): WalletIdType => validateWalletId(value),
  serialize: (value: unknown) => validateWalletId(value),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? validateWalletId(ast.value) : null),
})

export const resolvers: Resolvers = {
  WalletId: WalletIdScalar,
}
