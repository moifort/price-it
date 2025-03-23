export default `#graphql

type GameQuery {
  guesses: [Guess!]!
}

extend type Query {
  game: GameQuery!
}

type GameMutation {
  win: Boolean!
  lose: Boolean!
}

extend type Mutation {
  game: GameMutation!
}
`
