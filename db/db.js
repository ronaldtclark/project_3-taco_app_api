const mongoose = require('mongoose')
const mongoUri = process.env.MONGODG_URI || 'mongodb://localhost:27017/tacos'

mongoose.connect('mongodb://localhost/tacos')

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(err, 'mongoose failed to connect')
})

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected')
})

