const mongoose = require('mongoose')

const tacoSchema = new mongoose.Schema({
  name: String,
  restaurant: String,
  rating: Number,
  comments: [String] 
})

module.exports = mongoose.model('Taco', tacoSchema)