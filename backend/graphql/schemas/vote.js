const { gql } = require("apollo-server-express")

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
    createVote(idea_id: ID!, vote: Int!): Vote!
    updateVote(id: ID!, idea_id: ID!, vote: Int!): Vote!
    deleteVote(id: ID!): Vote!
  }
`

module.exports = upVoteSchema
