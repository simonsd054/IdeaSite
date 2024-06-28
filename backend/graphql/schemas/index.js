const commentSchema = require("./comment")
const ideaSchema = require("./idea")
const voteSchema = require("./vote")
const userSchema = require("./user")

module.exports = [commentSchema, ideaSchema, voteSchema, userSchema]
