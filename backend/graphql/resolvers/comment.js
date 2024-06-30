const { Comment, Idea, User } = require("../../database/schemas")
const { verifyToken } = require("../../utils")

const commentResolvers = {
  Comment: {
    user: async (parent) => {
      try {
        return await User.findById(parent.userId)
      } catch (err) {
        throw err
      }
    },
    idea: async (parent) => {
      try {
        return await Idea.findById(parent.ideaId)
      } catch (err) {
        throw err
      }
    },
    comment: async (parent) => {
      try {
        return await Comment.findById(parent.commentId)
      } catch (err) {
        throw err
      }
    },
    replies: async (parent) => {
      try {
        return await Comment.find({
          commentId: parent.id,
        })
      } catch (err) {
        throw err
      }
    },
  },
  Query: {
    comment: async (_, { id }) => {
      try {
        const comment = await Comment.findById(id)
        if (!comment) {
          const error = new Error(
            JSON.stringify({
              message: "Comment not found",
              status: 402,
            })
          )
          throw error
        }
        return comment
      } catch (err) {
        throw err
      }
    },
    commentsAndReplies: async () => {
      try {
        const comments = await Comment.find()
        return comments
      } catch (err) {
        throw err
      }
    },
    comments: async () => {
      try {
        const comments = await Comment.find({
          commentId: null,
        })
        return comments
      } catch (err) {
        throw err
      }
    },
  },
  Mutation: {
    createComment: async (_, { body, ideaId, commentId }, context) => {
      try {
        const user = await verifyToken(context.token)
        let comment = {
          body,
          userId: user._id,
          ideaId,
          commentId,
          is_author: false,
          is_suggested_to: false,
        }
        comment = await Comment.create(comment)
        return comment
      } catch (err) {
        throw err
      }
    },
    updateComment: async (_, { id, body, ideaId }, context) => {
      try {
        const user = await verifyToken(context.token)
        let comment = {
          body,
        }
        const updatedComment = await Comment.findOneAndUpdate(
          {
            _id: id,
            userId: user._id,
            ideaId,
          },
          comment
        )
        if (!updatedComment) {
          throw new CustomError("Comment couldn't be updated.")
        }
        return updatedComment
      } catch (err) {
        throw err
      }
    },
    deleteComment: async (_, { id, ideaId }, context) => {
      try {
        const user = await verifyToken(context.token)
        const comment = await Comment.findOneAndDelete({
          _id: id,
          userId: user._id,
          ideaId,
        })
        if (!comment) {
          throw new CustomError("Comment couldn't be deleted.")
        }
        return comment
      } catch (err) {
        throw err
      }
    },
  },
}

module.exports = commentResolvers
