const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idea_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("Vote", voteSchema)
