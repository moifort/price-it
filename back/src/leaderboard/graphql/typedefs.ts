export default `#graphql
type TopPlayer {
  rank: Int!
  id: UserId!
  name: String!
  score: Score!
}

extend type Query {
  topPlayers(limit: Limit!): [TopPlayer!]!
}
`
