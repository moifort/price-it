export default `#graphql
type Player {
    id : UserId!
    firstName: String!
    score: Score!
    runs: Runs!
    airdrop: Airdrop
}

extend type Query {
    me: Player!
}

type PlayerMutation {
    createIfNotExist: Boolean!
}

extend type Mutation {
   me: PlayerMutation!
}
`
