export default `#graphql
scalar ShopProductId
scalar Period

type ShopProduct {
  id: ShopProductId!
  description: String!
  category: String!
  amount: Point!
  period: Period!
  quantity: Quantity!
}

extend type Query {
  shopProducts: [ShopProduct!]!
}
`
