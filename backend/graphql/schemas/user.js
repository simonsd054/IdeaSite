const { gql } = require("apollo-server-express")

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
    gender: String
    address: String
    friends: [User]!
  }
  type Token {
    token: String!
    user: User!
  }
  type Query {
    users: [User]!
    user(id: ID!): User!
  }
  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
      phone: String!
      gender: String
      address: String
    ): Token
    login(
      email: String!
      password: String!
    ): Token
    updateUser(
      id: ID!
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
      phone: String!
      gender: String
      address: String
    ): User
    deleteUser(id: ID!): User
  }
`

module.exports = userSchema
