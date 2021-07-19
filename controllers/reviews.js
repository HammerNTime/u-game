import { Review } from "../models/review.js"
import { Game } from "../models/game.js"
import { Profile } from "../models/profile.js"



export {
  create,
  newReview as new,
  show,
  edit,
  update,
  deleteReview as delete,
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
    Game.findById(review.game._id)
    .then(game => {
      Profile.findById(req.params.id)
      .populate("reviews")
      .populate("ownedGames")
      .then(profile => {
        Profile.findById(req.user.profile._id)
        .then(self => {
          const isSelf = findSelf(self, review)  
          res.render("reviews/show", {
            title: `${review.title}`,
            review,
            game,
            isSelf,
            self,
          })
        })
      })
    })
  })
}

function edit(req, res) {
  console.log("i work")
  Review.findById(req.params.id)
  .populate("game")
  .populate("author")
  .then(review => {
    Profile.findById(req.params.id)
    .populate("reviews")
    .populate("ownedGames")
    .then(profile => {
      Profile.findById(req.user.profile._id)
      .then(self => {
        Game.findById(review.game._id)
        .populate("ownedBy")
        .then(game => {
          const isSelf = findSelf(self, review)
          if (isSelf){
            res.render("reviews/edit", {
              title: `Edit ${review.title}`,
              review,
              game,
              isSelf,
              self,
            })
          } else {
            res.redirect(`/reviews/${req.params.id}`)
          }
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/games")
  })
}

function update(req, res){
  Review.findById(req.params.id)
  .then(review => {
    if (review.author.equals(req.user.profile._id)){
      review.update(req.body, {new: true})
      .then(() => {
        res.redirect(`/reviews/${req.params.id}`)
      })
    }
  })
}

function deleteReview(req, res) {
  console.log("got to step 1")
  
  
  Review.findById(req.params.reviewId)
  .populate("game")
  .then(review => {
    console.log("got to step 2")
    Game.findById(review.game._id)
    .populate("reviews")
    .then(game => {
      console.log(game)
      Profile.findById(req.user.profile._id)
      .populate("reviews")
      .then(self => {
        console.log("got to step 3")
        if (review.author.equals(self._id)){
          self.reviews.remove({ "_id": `${review._id}` })
          self.save()
          game.reviews.remove({ "_id": `${review._id}` })
          game.save()
          review.delete()
          .then(() => {
            res.redirect(`/games/${game._id}`)
          })
        } else {
          res.redirect(`/reviews/${review._id}`)
        }
      })
    })
  })
  .catch(err => {
    console.log(err)
  })
}


function findSelf(selfParam, objId){
  let checker = false
  selfParam.reviews.forEach(param => {
    if (param._id.equals(objId._id)) {
      checker = true
    }
  })
  return checker
}

function deleteReviewsAll(model, id) {
  model.reviews.forEach(review => {
    if (review._id.equals(id._id)){
      review.remove()
    }
  })

}