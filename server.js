const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const PORT = process.env.PORT || 9000;

require('./db/db')

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const corsOptions = {
  origin: 'https://ctdb.herokuapp.com/',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const tacoController = require('./controllers/tacoController')
const authController = require('./controllers/authController')

app.use('/tacos', tacoController)
app.use('/auth/login', authController)

app.listen(PORT, () => {

  console.log('TACO APP API listening on port', PORT)

})
