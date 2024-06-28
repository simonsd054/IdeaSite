import { gql } from "graphql-request"

import { graphqlError } from "@/utils/error"
import { graphQLClient } from "./common"

const getIdeas = async (_, toast, queryName) => {
  const query = gql`
    {
      ${queryName} {
        id
        title
        body
        createdAt
        user {
          id
          name
        }
      }
    }
  `
  const response = await graphQLClient.rawRequest(query)
  const errors = graphqlError(response)
  if (errors) {
    toast({
      title: errors,
    })
  }
  return response
}

const getIdea = async (variables) => {
  const query = gql`
    query GetIdea($id: ID!) {
      idea(id: $id) {
        id
        title
        body
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const createIdea = async (variables) => {
  const query = gql`
    mutation CreateIdea($title: String!, $body: String!) {
      createIdea(title: $title, body: $body) {
        id
        title
        body
        user {
          name
        }
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const updateIdea = async (variables) => {
  const query = gql`
    mutation UpdateIdea($id: ID!, $title: String!, $body: String!) {
      updateIdea(id: $id, title: $title, body: $body) {
        id
        title
        body
        user {
          name
        }
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

const deleteIdea = async (variables) => {
  const query = gql`
    mutation DeleteIdea($id: ID!) {
      deleteIdea(id: $id) {
        id
        title
      }
    }
  `
  return await graphQLClient.rawRequest(query, variables)
}

export { getIdeas, getIdea, createIdea, updateIdea, deleteIdea }
