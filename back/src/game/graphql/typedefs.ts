export default `#graphql
type GameQuery {
  guesses: [Guess!]!
}

extend type Query {
  game: GameQuery!
}

type GameMutation {
  win(guessId: GuessId!): Boolean!
  lose(guessId: GuessId!): Boolean!
}

extend type Mutation {
  game: GameMutation!
}
`
