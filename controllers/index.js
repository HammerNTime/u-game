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
    let randNums = getRandomInt(games.length)
    res.render('index', { 
      title: 'Home', 
      user: req.user ? req.user : null,
      game1: games[randNums[0]],
      game2: games[randNums[1]],
      game3: games[randNums[2]]
    })
  })
}

function getRandomInt(max) {
  let nums = []
  let num1 = Math.floor(Math.random() * max)
  let num2 = Math.floor(Math.random() * max)
  let num3 = Math.floor(Math.random() * max)
  while (num2 === num1) {
    num2 = Math.floor(Math.random() * max)
  }
  while (num3 === num1 || num3 === num2) {
    num3 = Math.floor(Math.random() * max)
  }
  nums.push(num1, num2, num3)
  return nums
}