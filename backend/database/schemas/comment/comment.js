const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
    //comment or reply
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    isAuthor: Boolean,
    isSuggestedTo: Boolean,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Comment", commentSchema)
