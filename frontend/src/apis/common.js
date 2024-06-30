import { GraphQLClient } from "graphql-request"

let endpoint = import.meta.env.VITE_API_ENDPOINT

if (!endpoint.includes("http")) {
  endpoint = window.location.origin + endpoint
}

const graphQLClient = new GraphQLClient(endpoint, {
  errorPolicy: "all",
})

const token = localStorage.getItem("token")

if (token) {
  graphQLClient.setHeader("authorization", `Bearer ${token}`)
}

export { endpoint, graphQLClient }
