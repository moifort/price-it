export default `#graphql
scalar UserGuess

type GameQuery {
  guesses: [Guess!]!
}

extend type Query {
  game: GameQuery!
}

type GameMutation {
  win(guessId: GuessId!): Boolean!
  lose(guessId: GuessId!): Boolean!
  guess(guessId: GuessId!, userGuess: UserGuess!): Boolean!
}

extend type Mutation {
  game: GameMutation!
}
`
