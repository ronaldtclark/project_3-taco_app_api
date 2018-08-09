const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

require('./db/db')
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const tacoController = require('./controllers/tacoController')
const authController = require('./controllers/authController')

app.use('/tacos', tacoController)
app.use('/auth/login', authController)

app.listen(9000, () => {
  console.log('TACO APP API listening on port 9000')
})
