const express = require("express")
const http = require("http")

const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const mongoose = require("mongoose")
require("dotenv").config()

const graphqlResolvers = require("./graphql/resolvers")
const graphqlSchemas = require("./graphql/schemas")
const path = require("path")
const cors = require("cors")

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const app = express()

const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs: graphqlSchemas,
  resolvers: graphqlResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError) => {
    let error = {}
    // in development, return full error for easy debugging
    if (process.env.NODE_ENV === "development") {
      error = { ...formattedError }
    }

    // Return a different error message
    if (formattedError.extensions.code === "Custom") {
      error.extensions = {
        code: formattedError.extensions.code,
      }
      error.message = formattedError.message
    } else {
      // Otherwise return "Something went wrong"
      error.error = "Something went wrong"
    }

    // Use error key of this object in the frontend
    return error
  },
})

server.start().then(() => {
  app.use(
    "/api/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => {
        // Get the user token from the headers.
        let token = req.headers.authorization || ""

        token = token?.split(" ")?.[1] // token
        return { token }
      },
    })
  )

  app.use(express.static(path.resolve(__dirname, "dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
  })

  mongoose.connect(MONGO_URI).then(() => {
    httpServer.listen({ port: PORT }, () => {
      console.log(
        `Database connected and Apollo Graphql Server on http://localhost:${PORT}/api/graphql`
      )
    })
  })
})
