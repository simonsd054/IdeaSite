const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ideaId: {
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
