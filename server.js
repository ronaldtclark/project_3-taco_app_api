const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const PORT = 8000;

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
// app.use(cors())

const tacoController = require('./controllers/tacoController')
const authController = require('./controllers/authController')

app.use('/tacos', tacoController)
app.use('/auth', authController)


app.listen(PORT, () => {

  console.log('TACO APP API listening on port', PORT)

})
