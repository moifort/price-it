export default `#graphql 
scalar Run

type Runs {
  remaining: Run!
  renewAt: DateTime!
}
`
