const express = require("express")
const http = require("http")

const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")
require("dotenv").config()

const graphqlResolvers = require("./graphql/resolvers")
const graphqlSchemas = require("./graphql/schemas")
const { CustomError } = require("./utils")

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const app = express()

const server = new ApolloServer({
  typeDefs: graphqlSchemas,
  resolvers: graphqlResolvers,
  formatError: (formattedError) => {
    let error = {}
    // in development, return full error for easy debugging
    if (process.env.NODE_ENV === "development") {
      error = { ...formattedError }
    }

    // Return a different error message
    if (formattedError.extensions.code === "Custom") {
      error.error = formattedError.message
    } else {
      // Otherwise return "Something went wrong"
      error.error = "Something went wrong"
    }

    // Use error key of this object in the frontend
    return error
  },
  context: ({ req, res }) => {
    // Get the user token from the headers.
    let token = req.headers.authorization || ""

    token = token?.split(" ")?.[1] // token
    return { token }
  },
})

server.start().then(() => {
  server.applyMiddleware({ app, path: "/api/graphql" })
  const httpServer = http.createServer(app)

  app.get("/", () => {
    console.log("lol")
  })

  mongoose.connect(MONGO_URI).then(() => {
    httpServer.listen({ port: PORT }, () => {
      console.log(
        `Database connected and Apollo Graphql Server on http://localhost:${PORT}/api/graphql`
      )
    })
  })
})
