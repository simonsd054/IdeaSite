import { gql } from "graphql-request"

import { graphqlError } from "@/utils/error"
import { graphQLClient } from "./common"

const createComment = async (variables) => {
  const query = gql`
    mutation CreateComment($body: String!, $ideaId: ID!) {
      createComment(body: $body, ideaId: $ideaId) {
        id
        body
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const updateComment = async (variables) => {
  const query = gql`
    mutation UpdateComment($id: ID!, $body: String!, $ideaId: ID!) {
      updateComment(id: $id, body: $body, ideaId: $ideaId) {
        id
        body
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const deleteComment = async (variables) => {
  const query = gql`
    mutation DeleteComment($id: ID!, $ideaId: ID!) {
      deleteComment(id: $id, ideaId: $ideaId) {
        id
        body
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

export { createComment, updateComment, deleteComment }
