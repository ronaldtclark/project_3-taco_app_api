const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// REGISTER
router.post('/register', async (req, res) => {
  try {
    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const user = {}
    user.username = req.body.username
    user.password = passwordHash
    const newUser = await User.create(user)
      req.session.userID = newUser.id
      req.session.username = newUser.username
      req.session.loggedIn = true
      res.json({
        status: 200,
        data: newUser
      })
  } catch(err) {
    res.send(err)
  }
})


// LOGIN
router.post('/login', async (req, res) => {
  console.log(req.session, 'this is session')

  try {
    const foundUser = await User.findOne({username: req.body.username})
    if(foundUser && bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.userID = foundUser.id;
      req.session.username = foundUser.username;
      req.session.loggedIn = true;
      res.json({
        status: 200,
        data: foundUser
      })
    } else {
      res.json({
        status: 404,
        data: 'Username or Password Incorrect'
      })
    }
  } catch(err) {
    res.send(err)
  }  
})


// LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: 200,
        data: 'Logout Success'
      })
    }
  })
})






module.exports = router