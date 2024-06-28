const { GraphQLError } = require("graphql")

class CustomError extends GraphQLError {
  constructor(message, code) {
    super()

    this.message = message
    this.extensions.code = "Custom"
  }
}

module.exports = CustomError
