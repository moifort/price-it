export default `#graphql
scalar ProductId
scalar Period
scalar Category

type Product {
  id: ProductId!
  name: String!
  description: String!
  category: Category!
  amount: TelegramStar!
  period: Period!
  quantity: Quantity!
}
`
