const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idea_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
    //comment or reply
    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    is_author: {
      type: Boolean,
      required: true,
    },
    is_suggested_to: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Comment", commentSchema)
