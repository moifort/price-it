export default `#graphql 
scalar PlayerId

type Player {
    id : PlayerId!
    firstName: String!
    lastName: String
    score: Score!
}

type Query {
    me: Player!
}
`
