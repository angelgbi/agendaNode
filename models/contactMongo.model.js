const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
  name: String,
  nickname: String,
  email: String,
  phone_number: String,
  notes: String
})

module.exports = mongoose.model('Contacts', ContactSchema)
