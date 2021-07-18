import { Review } from "../models/review.js"
import { Game } from "../models/game.js"



export {
  create,
  newReview as new,
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

function create(req,res) {
  Game.findById(req.params.id)
  .then(game => {
    let review = new Review(req.body)
    review.save(err => {
      if (err) return res.redirect(`/reviews/${req.params.id}/new`)
      game.reviews.push(review._id)
      game.save(err => {
        if (err) return res.redirect(`/reviews/${req.params.id}/new`)
        res.redirect(`/games/${req.params.id}`)
      })
    })
  })
}