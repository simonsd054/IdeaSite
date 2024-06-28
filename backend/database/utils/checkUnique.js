const mongoose = require("mongoose")

async function checkUnique(model, field, data) {
  const item = await mongoose.model(model).findOne({ [field]: data })
  return item ? false : true
}

module.exports = checkUnique
