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
      review.game = game.id
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
  .populate("game")
  .populate("author")
  .then(review => {
    let reviewId = review._id
    Profile.findById(req.params.id)
    .populate("reviews")
    .populate("ownedGames")
    .then(profile => {
      Profile.findById(req.user.profile._id)
      .then(self => {
        const isSelf = findSelf(self, reviewId)  
        console.log(isSelf)
        res.render("reviews/show", {
          title: `${review.title}`,
          review,
          game: review.game,
          isSelf,
          self,
        })
      })
    })
  })
}

function findSelf(selfParam, objId){
  let checker = false
  selfParam.reviews.forEach(param => {
    if (param._id.equals(objId)) {
      checker = true
    }
  })
  return checker
}