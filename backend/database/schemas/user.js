const mongoose = require("mongoose")

const { checkUnique } = require("../utils")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          return await checkUnique("User", "email", v)
        },
        message: (props) => `${props.value} already exists`,
      },
    },
    emailVerifiedAt: Date,
    password: {
      type: String,
      required: true,
    },
    address: String,
    gender: String,
    phone: {
      type: Number,
      required: true,
    },
    // TODO: change friendsIds to junction table
    fiendsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
