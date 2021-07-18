import { Game } from "../models/game.js"
import { Review } from "../models/review.js"



export {
  index,
  newGame as new,
  create,
  show,
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
    console.log(err)
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
    console.log(game)
    res.render("games/show", {
      title: game.title,
      game
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}