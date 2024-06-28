const { Comment, Idea, Vote, User } = require("../../database/schemas")
const { verifyToken, CustomError } = require("../../utils")

const ideaResolvers = {
  Idea: {
    user: async (parent) => {
      try {
        return await User.findById(parent.user_id)
      } catch (err) {
        throw err
      }
    },
    co_authors: async (parent) => {
      try {
        const co_authors = await User.find({
          _id: {
            $in: parent.co_authors_ids,
          },
        })
        return co_authors
      } catch (err) {
        throw err
      }
    },
    suggested_to: async (parent) => {
      try {
        const suggested_to = await User.find({
          _id: {
            $in: parent.suggested_to_ids,
          },
        })
        return suggested_to
      } catch (err) {
        throw err
      }
    },
    derived_from: async (parent) => {
      try {
        const derived_from = await Idea.find({
          _id: {
            $in: parent.derived_from_ids,
          },
        })
        return derived_from
      } catch (err) {
        throw err
      }
    },
    comments: async (parent) => {
      try {
        const comments = await Comment.find({
          idea_id: parent._id,
        })
        return comments
      } catch (err) {
        throw err
      }
    },
    votes: async (parent) => {
      try {
        const votes = Vote.find({
          idea_id: parent._id,
        })
        return votes
      } catch (err) {
        throw err
      }
    },
  },
  Vote: {
    user: async (parent) => {
      try {
        const user = User.findById(parent.user_id)
        return user
      } catch (err) {
        throw err
      }
    },
    idea: async (parent) => {
      try {
        const idea = Idea.findById(parent.idea_id)
        return idea
      } catch (err) {
        throw err
      }
    },
  },
  Query: {
    ideas: async () => {
      try {
        const ideas = await Idea.find().sort({ updatedAt: -1 })
        return ideas
      } catch (err) {
        throw err
      }
    },
    idea: async (_, { id }) => {
      try {
        const idea = await Idea.findById(id)
        if (!idea) {
          throw new CustomError("Idea not found")
        }
        return idea
      } catch (err) {
        throw err
      }
    },
    myIdeas: async (_, __, context) => {
      try {
        const user = await verifyToken(context.token)
        const ideas = await Idea.find({
          user_id: user._id,
        }).sort({ updatedAt: -1 })
        return ideas
      } catch (err) {
        throw err
      }
    },
    votes: async () => {
      try {
        const votes = await Vote.find()
        return votes
      } catch (err) {
        throw err
      }
    },
    vote: async (_, { id }) => {
      try {
        const vote = await Vote.findById(id)
        if (!vote) {
          throw new CustomError("Vote not found")
        }
        return vote
      } catch (err) {
        throw err
      }
    },
  },
  Mutation: {
    createIdea: async (
      _,
      { title, body, co_authors, suggested_to, derived_from },
      context
    ) => {
      try {
        const user = await verifyToken(context.token)
        let idea = {
          title,
          body,
          user_id: user._id,
          co_authors,
          suggested_to,
          derived_from,
        }
        idea = await Idea.create(idea)
        return idea
      } catch (err) {
        throw err
      }
    },
    updateIdea: async (
      _,
      { id, title, body, co_authors, suggested_to, derived_from },
      context
    ) => {
      try {
        const user = await verifyToken(context.token)
        let idea = {
          title,
          body,
          user_id: user._id,
          co_authors,
          suggested_to,
          derived_from,
        }
        const updatedIdea = await Idea.findByIdAndUpdate(id, idea)
        if (!updatedIdea) {
          throw new CustomError("Idea couldn't be updated.")
        }
        return updatedIdea
      } catch (err) {
        throw err
      }
    },
    deleteIdea: async (_, { id }, context) => {
      try {
        const user = await verifyToken(context.token)
        const idea = await Idea.findOneAndDelete({
          _id: id,
          user_id: user._id,
        })
        if (!idea) {
          throw new CustomError("Idea couldn't be deleted.")
        }
        return idea
      } catch (err) {
        throw err
      }
    },
    createVote: async (_, { idea_id, vote }, context) => {
      try {
        const user = await verifyToken(context.token)
        let voteCreated = {
          user_id: user._id,
          idea_id,
          vote,
        }
        voteCreated = await Vote.create(voteCreated)
        return voteCreated
      } catch (err) {
        throw err
      }
    },
  },
}

module.exports = ideaResolvers
