export default `#graphql
scalar ProductId
scalar Period

type Product {
  id: ProductId!
  name: String!
  description: String!
  category: String!
  amount: TelegramStar!
  period: Period!
  quantity: Quantity!
}
`
