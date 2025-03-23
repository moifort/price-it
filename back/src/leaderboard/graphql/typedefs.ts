export default `#graphql
type TopPlayer {
  rank: Int!
  id: UserId!
  name: String!
  score: Score!
}

type LeaderboardQuery {
  topPlayers(limit: Limit!): [TopPlayer!]!
}

extend type Query {
  leaderboard: LeaderboardQuery!
}
`
