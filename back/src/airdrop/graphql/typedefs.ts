export default `#graphql 
scalar WalletId

type Airdrop {
   walletId: WalletId
}

extend type Mutation {
  setWalletId(walletId: WalletId!): Boolean!
}
`
