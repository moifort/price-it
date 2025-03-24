export default `#graphql
type TopPlayer {
  rank: Rank!
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
