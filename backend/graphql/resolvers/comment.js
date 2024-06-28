const { Comment, Idea, User } = require("../../database/schemas")

const commentResolvers = {
  Comment: {
    user: async (parent) => {
      try {
        return await User.findById(parent.user_id)
      } catch (err) {
        throw err
      }
    },
    idea: async (parent) => {
      try {
        return await Idea.findById(parent.idea_id)
      } catch (err) {
        throw err
      }
    },
    comment: async (parent) => {
      try {
        return await Comment.findById(parent.comment_id)
      } catch (err) {
        throw err
      }
    },
    replies: async (parent) => {
      try {
        return await Comment.find({
          comment_id: parent.id,
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
          comment_id: null,
        })
        return comments
      } catch (err) {
        throw err
      }
    },
  },
  Mutation: {
    createComment: async (_, { body, idea_id, comment_id }, context) => {
      try {
        const user = await verifyToken(context.token)
        let comment = {
          body,
          user_id: user._id,
          idea_id,
          comment_id,
          is_author: false,
          is_suggested_to: false,
        }
        comment = await Comment.create(comment)
        return comment
      } catch (err) {
        throw err
      }
    },
  },
}

module.exports = commentResolvers
