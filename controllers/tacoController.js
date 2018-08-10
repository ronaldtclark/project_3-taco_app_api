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


// UPVOTE get, print, save
router.put('/:id/upvote', async (req, res) => {
  try {
    // find a taco in the database using our mongoose model
    // store it in a variable called upVotedTaco
    const upVotedTaco = await Taco.findById(req.params.id, req.body, {new: true})
    // increase rating
    upVotedTaco.rating++
    const data = await upVotedTaco.save()
    const allTacos = await Taco.find({})

    // Get upVotedTaco's rating and add 1 upVotedTaco.rating
    // const newRating
    // Get update upVoted tacos rating using findByIdAndUpdate
    // const updatedTaco
    // Res.send the updated instance using {new: true} in the findByIdAndUpdate
    
    res.json(allTacos)
  } catch(err) {
    res.send(err)
  }
})


// DOWNVOTE
router.put('/:id/downvote', async (req, res) => {
  try {
    const downVotedTaco = await Taco.findById(req.params.id, req.body, {new: true})
    downVotedTaco.rating--
    const data = await downVotedTaco.save()
    const allTacos = await Taco.find({})
    res.json(allTacos)
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
});



router.get('/search/:restaurantname', (req, res) => {
  
//SEARCH
  request 
    .get("https://api.yelp.com/v3/businesses/search?term=" + req.params.restaurantname + "&location=Chicago")    
    .set('Authorization', 'Bearer gr0amugCLWzgKkSCIgPZnPI8e7cRXFuEprIOGszYzUIo9JH5kWT1LMMZUkIW0tOBpywUrjmxns-zKDh5FoGsj4_SPNZG_-WDeGAzOCESd0wG9ZX5tUOXIRo4H2poW3Yx')
    .end((err, response) => { 
      if (err) {
        console.log(err)
      } else {
        res.json(JSON.parse(response.text))
        // res.json({
        //   status: 200,
        //   data: response
        // })
      }
    })
})


module.exports = router