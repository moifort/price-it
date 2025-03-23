export default `#graphql 
scalar WalletId

type Airdrop {
    walletId: WalletId
}

type AirdropMutation {
    updateWalletId(walletId: WalletId!): Boolean!
}

extend type Mutation {
    airdrop: AirdropMutation!
}
`
