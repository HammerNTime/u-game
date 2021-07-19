import { Review } from "../models/review.js"
import { Game } from "../models/game.js"
import { Profile } from "../models/profile.js"



export {
  create,
  newReview as new,
  show,
}

function newReview(req, res) {
  Game.findById(req.params.id)
  .populate("ownedBy")
  .then(game => {
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
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Game.findById(req.params.id)
    .then(game => {
      let review = new Review(req.body)
      review.author = profile.id
      review.gameTitle = game.title
      review.save()
      .then(() => {
        game.reviews.push(review._id)
        game.save()
        .then(() => {
          profile.reviews.push(review.id)
          profile.save()
          .then(() => {
          res.redirect(`/games/${req.params.id}`)
          })
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/reviews/${req.params.id}/new`)
  })
}

function show(req, res) {
  Review.findById(req.params.id)
  .then(review => {
    res.render("/reviews/show", {
      title: review.title,
      review,
    })
  })
}