export default `#graphql
scalar ProductId
scalar Period

type Product {
  id: ProductId!
  name: String!
  description: String!
  category: String!
  amount: Point!
  period: Period!
  quantity: Quantity!
}
`
