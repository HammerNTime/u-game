import { Review } from "../models/review.js"
import { Game } from "../models/game.js"



export {

  newReview as new
}

function newReview(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    console.log(game)
    res.render("reviews/new", {
      title: `Review ${game.title}`,
      game
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}