const { gql } = require("apollo-server-express")

const ideaSchema = gql`
  type Idea {
    id: ID!
    title: String!
    body: String!
    user: User!
    co_authors: [User]
    suggested_to: [User]
    derived_from: [Idea]
    comments: [Comment]
    votes: [Vote]
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    ideas: [Idea]!
    idea(id: ID!): Idea!
    myIdeas: [Idea]!
  }
  extend type Mutation {
    createIdea(
      title: String!
      body: String!
      co_authors: [ID]
      suggested_to: [ID]
      derived_from: [ID]
    ): Idea!
    updateIdea(
      id: ID!
      title: String!
      body: String!
      co_authors: [ID]
      suggested_to: [ID]
      derived_from: [ID]
    ): Idea!
    deleteIdea(id: ID!): Idea!
  }
`

module.exports = ideaSchema
