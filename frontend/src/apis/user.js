import { gql } from "graphql-request"

import { graphQLClient } from "./common"

const registerUser = async (variables) => {
  const query = gql`
    mutation RegisterUser(
      $name: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
      $address: String!
      $gender: String
      $phone: String!
    ) {
      register(
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        address: $address
        gender: $gender
        phone: $phone
      ) {
        token
        user {
          id
          name
        }
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const loginUser = async (variables) => {
  const query = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          name
        }
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

export { registerUser, loginUser }
