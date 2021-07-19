import { Game } from "../models/game.js"
import { Review } from "../models/review.js"
import { Profile } from "../models/profile.js"



export {
  index,
  newGame as new,
  create,
  show,
  ownGame,
}

function index(req, res){
  Game.find({})
  .then(games => {
    res.render("games/index", {
      title: "All Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function newGame(req, res) {
  res.render("games/new", {
    title: "Add New Game"
  })
}

function create(req, res){
  let game = new Game(req.body)
  game.save(function(err){
    if (err) return res.redirect("/games/new")
    res.redirect("/games")
  })
}

function show(req, res) {
  Game.findById(req.params.id)
  .populate("reviews")
  .then(game => {
    res.render("games/show", {
      title: game.title,
      game
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function ownGame(req, res) {
  console.log(req.user.profile)
  Game.findById(req.params.id)
  .then(game => {
    res.redirect(`/games/${req.params.id}`)
  })
}