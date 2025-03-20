export default `#graphql
type Player {
    id : UserId!
    firstName: String!
    score: Score!
    runs: Runs!
    airdrop: Airdrop
}

type Mutation {
    createPlayerIfNotExist: UserId!
}

type Query {
    me: Player!
}
`
