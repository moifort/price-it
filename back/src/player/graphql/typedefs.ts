export default `#graphql 
scalar PlayerId

type Player {
    id : PlayerId!
    firstName: String!
    lastName: String
    score: Score!
}

type Mutation {
    createPlayerIfNotExist: PlayerId!
}

type Query {
    me: Player!
}
`
