const { gql } = require("apollo-server-express")

const commentSchema = gql`
  type Comment {
    id: ID!
    body: String!
    user: User!
    idea: Idea!
    isAuthor: Boolean!
    isSuggestedTo: Boolean!
    comment: Comment
    replies: [Comment]!
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    comments: [Comment]!
    commentsAndReplies: [Comment]!
    comment(id: ID!): Comment!
  }
  extend type Mutation {
    createComment(body: String!, ideaId: ID!, commentId: ID): Comment!
    updateComment(id: ID!, body: String!, ideaId: ID!): Comment!
    deleteComment(id: ID!, ideaId: ID!): Comment!
  }
`

module.exports = commentSchema
