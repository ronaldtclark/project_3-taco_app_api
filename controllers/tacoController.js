const express = require('express')
const router = express.Router()
const Taco = require('../models/taco')
const request = require('superagent')


//INDEX
router.get('/', async (req, res) => {
  console.log(req.session, 'this is get all')
  try {
    const allTacos = await Taco.find()

    res.json({
      status: 200,
      data: allTacos
    })

  } catch(err) {
    res.send(err)
  }
})

//NEW
router.post('/', async (req, res) => {
  console.log(req.session, 'this is req.session in post route')
  try {
    console.log(req.body, 'this is req.body')
    const createdTaco = await Taco.create(req.body)

    res.json({
      status: 200,
      data: createdTaco
    })

  } catch(err) {
    res.send(err)
  }
})

//SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundTaco = await Taco.findById(req.params.id)

    res.json({
      status: 200,
      data: foundTaco
    })

  } catch(err) {
    res.send(err)
  }
})

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedTaco = await Taco.findByIdAndUpdate(req.params.id)

    res.json({
      status: 200,
      data: updatedTaco
    })

  } catch(err) {
    res.send(err)
  }
})

//DELETE
router.delete(':/id', async (req, res) => {
  try {
    const deletedTaco = await Taco.findByIdAndRemove(req.params.id)

    res.json({
      status: 200,
      data: deletedTaco
    })

  } catch(err) {
    res.send(err)
  }
})


//SEARCH
  request 
    .get ("https://api.yelp.com/v3/businesses/search?term=tacos&location=Chicago")    
    .set ('Authorization', 'Bearer gr0amugCLWzgKkSCIgPZnPI8e7cRXFuEprIOGszYzUIo9JH5kWT1LMMZUkIW0tOBpywUrjmxns-zKDh5FoGsj4_SPNZG_-WDeGAzOCESd0wG9ZX5tUOXIRo4H2poW3Yx')
    .end (function (err, response){ 
      if (err) {
        console.log(err)
      } else {
        console.log(
        res.json({
          status: 200,
          data: response
        })
      }
    })


module.exports = router