const mongoose = require('mongoose')

const tacoSchema = new mongoose.Schema({
  name: String,
  restaurant: String,
  rating: {
    type: Number,
    default: 0
  },
  comments: [String] 
})

module.exports = mongoose.model('Taco', tacoSchema)