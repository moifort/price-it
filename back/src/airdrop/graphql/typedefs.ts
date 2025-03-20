export default `#graphql 
scalar WalletId

extend type Mutation {
  setWalletId(walletId: WalletId!): Boolean!
}
`
