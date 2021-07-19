import { Game } from "../models/game.js"
import { Review } from "../models/review.js"
import { Profile } from "../models/profile.js"
import { currentview } from '../middleware/middleware.js'


export {
  index
}

function index(req, res) {
  if (currentview) {
    res.redirect(currentview || "/")
  }
  Game.find({})
  .then(games => {
    let randNum1 = null
    let randNum2 = null
    let randNum3 = null
    randNum1 = getRandomInt(games.length)
    res.render('index', { 
      title: 'Home', 
      user: req.user ? req.user : null,
      
    })
  })
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}