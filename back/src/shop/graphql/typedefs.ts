export default `#graphql
scalar ShopProductId
scalar Period

type ShopProduct {
  id: ShopProductId!
  name: String!
  description: String!
  category: String!
  amount: Point!
  period: Period!
  quantity: Quantity!
}

extend type Query {
  shopProducts: [ShopProduct!]!
}

extend type Mutation {
  buyProduct(id: ShopProductId!): String!
}
`
