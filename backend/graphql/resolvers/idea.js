const { Comment, Idea, Vote, User } = require("../../database/schemas")
const { verifyToken, CustomError } = require("../../utils")

const ideaResolvers = {
  Idea: {
    user: async (parent) => {
      try {
        return await User.findById(parent.userId)
      } catch (err) {
        throw err
      }
    },
    co_authors: async (parent) => {
      try {
        const co_authors = await User.find({
          _id: {
            $in: parent.coAuthorsIds,
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
            $in: parent.suggestedToIds,
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
            $in: parent.derivedFromIds,
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
          ideaId: parent._id,
        }).sort({ updatedAt: -1 })
        return comments
      } catch (err) {
        throw err
      }
    },
    votes: async (parent) => {
      try {
        const votes = Vote.find({
          ideaId: parent._id,
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
        const user = User.findById(parent.userId)
        return user
      } catch (err) {
        throw err
      }
    },
    idea: async (parent) => {
      try {
        const idea = Idea.findById(parent.ideaId)
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
          userId: user._id,
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
          userId: user._id,
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
          userId: user._id,
          co_authors,
          suggested_to,
          derived_from,
        }
        const updatedIdea = await Idea.findOneAndUpdate(
          {
            _id: id,
            userId: user._id,
          },
          idea
        )
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
          userId: user._id,
        })
        if (!idea) {
          throw new CustomError("Idea couldn't be deleted.")
        }
        return idea
      } catch (err) {
        throw err
      }
    },
    createVote: async (_, { ideaId, vote }, context) => {
      try {
        const user = await verifyToken(context.token)
        let voteCreated = {
          userId: user._id,
          ideaId,
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
