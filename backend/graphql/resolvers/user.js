const bcrypt = require("bcrypt")
const { isEmpty } = require("lodash")

const { CustomError, createToken } = require("../../utils")
const { User } = require("../../database/schemas")

const userResolvers = {
  User: {
    friends: async () => {},
  },
  Query: {
    users: async () => {
      const users = await User.find()
      return users
    },
    user: async (_, { id }) => {
      const user = await User.findById(id)
      return user
    },
  },
  Mutation: {
    register: async (
      _,
      { name, email, password, confirmPassword, phone, gender, address }
    ) => {
      if (password !== confirmPassword) {
        throw new CustomError("Password and Confirm Password do not match")
      }
      let user = {
        name,
        email,
        phone,
        gender,
        address,
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      try {
        user = await User.create(user)
      } catch (err) {
        if (err.message.includes("already exists")) {
          throw new CustomError(err.message)
        }
        throw new CustomError("Cannot register the user. Contact admin.")
      }
      const token = createToken(user._id)
      return { token, user }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email })
      if (isEmpty(user)) {
        throw new CustomError("Cannot find the user with that email")
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        throw new CustomError("Incorrect password")
      }
      const token = createToken(user._id)
      return { token, user }
    },
    // updateUser: async (_, { id, name, email, phone, gender, address }) => {
    //   const user = {  }
    // }
  },
}

module.exports = userResolvers
