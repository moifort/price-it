export default `#graphql
type ShopQuery {
  products: [Product!]!
}

type ShopMutation {
  createInvoice(productId: ProductId!): Url!
}

type Query {
  shop: ShopQuery!
}

type Mutation {
  shop: ShopMutation!
}
`
