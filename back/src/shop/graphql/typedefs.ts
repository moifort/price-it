export default `#graphql
type ShopQuery {
  products: [Product!]!
}

type ShopMutation {
  invoice(productId: ProductId!): String!
}

type Query {
  shop: ShopQuery!
}

type Mutation {
  shop: ShopMutation!
}
`
