export default `#graphql
scalar ProductId

type Product {
  id: ProductId!
  name: String!
  image: Url!
  price: Amount!
  category: String!
  url: Url!
}

type Query {
  products(limit: Limit!): [Product!]!
}
`
