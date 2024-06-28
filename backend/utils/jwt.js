const jwt = require("jsonwebtoken")
const CustomError = require("./customError")
const { User } = require("../database/schemas")
const { isEmpty } = require("lodash")

const createToken = (userId) => {
  return jwt.sign({ data: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: "1 days",
  })
}

const verifyToken = async (token) => {
  //check if token exists
  if (!token) {
    throw new CustomError("Unauthenticated")
  }
  try {
    //verify the token using the secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(payload.data)
    if (isEmpty(user)) {
      throw new Error()
    }
    //put the payload(_id) in the request for other functions to use
    return user
  } catch (err) {
    throw new CustomError("Unauthenticated")
  }
}

module.exports = { createToken, verifyToken }
