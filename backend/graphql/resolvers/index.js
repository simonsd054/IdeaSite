const { merge } = require("lodash")

const commentResolvers = require("./comment")
const ideaResolvers = require("./idea")
const userResolvers = require("./user")

module.exports = merge(commentResolvers, ideaResolvers, userResolvers)
