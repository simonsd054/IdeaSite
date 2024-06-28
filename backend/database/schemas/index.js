const Comment = require("./comment")
const Idea = require("./idea")
const User = require("./user")

module.exports = {
  ...Comment,
  ...Idea,
  User,
}
