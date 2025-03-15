export default `#graphql 
scalar Run

type Runs {
  remaining: Run!
  total: Run!
  renewIn: Minute!
}
`
