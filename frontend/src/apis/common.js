import { GraphQLClient } from "graphql-request"

const endpoint = window.location.origin + import.meta.env.VITE_API_ENDPOINT

const graphQLClient = new GraphQLClient(endpoint, {
  errorPolicy: "all",
})

const token = localStorage.getItem("token")

if (token) {
  graphQLClient.setHeader("authorization", `Bearer ${token}`)
}

export { endpoint, graphQLClient }
