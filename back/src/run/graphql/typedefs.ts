export default `#graphql 
scalar Run

type Runs {
  remaining: Run!
  total: Run!
  renewAt: DateTime!
}
`
