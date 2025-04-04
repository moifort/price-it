export default `#graphql
scalar GuessId

type Guess {
  id: GuessId!
  name: String!
  description: String
  image: Url!
  price: Amount!
  displayed: Amount!
  category: String!
  url: Url!
}
`
