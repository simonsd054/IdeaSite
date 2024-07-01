const gql = require("graphql-tag")

const upVoteSchema = gql`
  type Vote {
    id: ID!
    user: User!
    idea: Idea!
    vote: Int!
  }
  extend type Query {
    votes: [Vote]!
    vote(id: ID!): Vote!
  }
  extend type Mutation {
    createVote(ideaId: ID!, vote: Int!): Vote!
    updateVote(id: ID!, ideaId: ID!, vote: Int!): Vote!
    deleteVote(id: ID!): Vote!
  }
`

module.exports = upVoteSchema
