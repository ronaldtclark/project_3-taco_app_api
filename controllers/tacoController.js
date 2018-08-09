const express = require('express')
const router = express.Router()
const Taco = require('../models/taco')


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

    // Get upVotedTaco's rating and add 1 upVotedTaco.rating
    // const newRating
    // Get update upVoted tacos rating using findByIdAndUpdate
    // const updatedTaco
    // Res.send the updated instance using {new: true} in the findByIdAndUpdate
    
    res.json(upVotedTaco)
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
    res.json(downVotedTaco)
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


module.exports = router