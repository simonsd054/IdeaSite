const { gql } = require("apollo-server-express")

const commentSchema = gql`
  type Comment {
    id: ID!
    body: String!
    user: User!
    idea: Idea!
    is_author: Boolean!
    is_suggested_to: Boolean!
    comment: Comment
    replies: [Comment]!
  }
  extend type Query {
    comments: [Comment]!
    commentsAndReplies: [Comment]!
    comment(id: ID!): Comment!
  }
  extend type Mutation {
    createComment(body: String!, idea_id: ID!, comment_id: ID!): Comment!
    updateComment(id: ID!, body: String!): Comment!
    deleteComment(id: ID!): Comment!
  }
`

module.exports = commentSchema
