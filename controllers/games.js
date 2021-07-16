import { Game } from "../models/game.js"


export {
  index,
  newGame as new,
  create,
}

function index(req, res){
  res.render("games/index", {
    title: "All Games",
  })
}

function newGame(req, res) {
  res.render("games/new", {
    title: "Add New Game"
  })
}

function create(req, res){
  console.log("i work")
  let game = new Game(req.body)
  game.save(function(err){
    if (err) return res.redirect("/games/new")
    res.redirect("/games")
  })
}