export default `#graphql
type Bonus {
    run: Run!
    win: Point!
    winExpiredAt: DateTime!
}
type Player {
    id : UserId!
    firstName: String!
    score: Score!
    runs: Runs!
    airdrop: Airdrop
    bonus: Bonus!
    task: Task!
    affiliation: Affiliation!
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
