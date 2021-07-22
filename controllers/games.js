import { Game } from "../models/game.js"
import { Review } from "../models/review.js"
import { Profile } from "../models/profile.js"


export {
  index,
  newGame as new,
  create,
  show,
  ownGame,
  action,
  adventure,
  rpg,
  shooter,
  simulation,
  sports,
  edit,
  update,
  deleteGame as delete,
}

function index(req, res){
  Game.find({})
  .sort("title")
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
  .populate("ownedBy")
  .then(game => {
    const avgRating = getAverage(game)
    res.render("games/show", {
      title: game.title,
      game,
      avgRating
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function ownGame(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    Game.findById(req.params.id)
    .then(game => {
      profile.ownedGames.push(game._id)
      game.ownedBy.push(req.user.profile._id)
      profile.save()
      game.save()
      .then(() => {  
        res.redirect(`/games/${req.params.id}`)
      })
    })
  })
}

function action(req, res) {
  Game.find({genre: "Action"})
  .sort("title")
  .then(games => {
    res.render("games/index", {
      title: "Action Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function adventure(req, res) {
  Game.find({genre: "Adventure"})
  .sort("title")
  .then(games => {
    res.render("games/index", {
      title: "Adventure Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function rpg(req, res) {
  Game.find({genre: "RPG"})
  .sort("title")
  .then(games => {
    res.render("games/index", {
      title: "RPG Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function shooter(req, res) {
  Game.find({genre: "Shooter"})
  .then(games => {
    res.render("games/index", {
      title: "Shooter Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function simulation(req, res) {
  Game.find({genre: "Simulation"})
  .sort("title")
  .then(games => {
    res.render("games/index", {
      title: "Simulation Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function sports(req, res) {
  Game.find({genre: "Sports"})
  .sort("title")
  .then(games => {
    res.render("games/index", {
      title: "Sports Games",
      games,
    })
  })
  .catch(err => {
    res.redirect("/games")
  })
}

function edit(req, res){
  Game.findById(req.params.id)
  .then(game => {
    res.render("games/edit", {
      title: `Edit ${game.title}`,
      game,
    })
  })
}

function update(req, res){
  Game.findById(req.params.id)
  .then(game => {
    if (req.user) {
      game.update(req.body, {new: true})
      .then(() => {
        res.redirect(`/games/${req.params.id}`)
      })
    } else {
      res.redirect(`/games/${req.params.id}`)
    }
  })
}

function deleteGame(req, res) {
  Game.findById(req.params.id)
  .populate("reviews")
  .populate("ownedBy")
  .then(game => {
    game.ownedBy.forEach(owner => {
      owner.ownedGames.remove({ "_id": `${game._id}`})
      owner.save()
    })
    game.reviews.forEach(review => {
      Profile.findById(review.author)
      .populate("reviews")
      .then(profile => {
        profile.reviews.remove({ "_id": `${review._id}`})
        profile.save()
      })
      review.delete()
    })
    game.delete()
    .then(() => {
      res.redirect("/games")
    })
  })
  .catch(err => {
    console.log(err)
  })
}



function getAverage(game){
  let totalRating = 0
  game.reviews.forEach(review => {
    totalRating += parseInt(review.rating)
  })
  totalRating = totalRating/game.reviews.length
  let final = getStars(totalRating)
  return final
}

function getStars(totalRating){
  if (totalRating < 1.5) {
    return "⭐"
  } else if (totalRating < 2) {
    return "⭐ ½"
  } else if (totalRating < 3) {
    return "⭐⭐ ½"
  } else if (totalRating < 3.5) {
    return "⭐⭐⭐"
  } else if (totalRating < 4) {
    return "⭐⭐⭐ ½"
  } else if (totalRating < 4.5) {
    return "⭐⭐⭐⭐"
  } else if (totalRating < 4.9) {
    return "⭐⭐⭐⭐ ½"
  } else if (totalRating <= 5) {
    return "⭐⭐⭐⭐⭐"
  }
}