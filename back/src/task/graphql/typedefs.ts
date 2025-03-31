export default `#graphql
scalar Media

type Task {
  join: [Media!]!
}

type TaskMutation {
  join(media: Media!): Boolean!
}

extend type Mutation {
  task: TaskMutation!
}
`
