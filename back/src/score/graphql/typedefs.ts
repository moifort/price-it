export default `#graphql 
scalar Score
scalar Point

type Mutation {
    addPointsToScore(points: Point!): Boolean
}
`
