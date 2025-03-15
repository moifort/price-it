export default `#graphql 
scalar PlayerId

type Player {
    id : PlayerId!
    firstName: String!
    lastName: String
    score: Score!
    runs: Runs!
}

type Mutation {
    createPlayerIfNotExist: PlayerId!
}

type Query {
    me: Player!
}
`
