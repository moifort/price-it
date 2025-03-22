export default `#graphql
scalar GuessId

type Guess {
  id: GuessId!
  name: String!
  description: String
  image: Url!
  price: Amount!
  category: String!
  url: Url!
}

type Query {
  guess: [Guess!]!
}
`
