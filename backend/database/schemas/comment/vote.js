const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    vote: {
      type: Number,
      enum: [-1, 1],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("VoteComment", voteSchema)
