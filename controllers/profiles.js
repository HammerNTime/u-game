import { Profile } from "../models/profile.js"
import { Review } from "../models/review.js"
import { Game } from "../models/game.js"



export {
  show,
  addConsole,
  createConsole,
  edit,
  update,
  index,
}


function index(req, res) {
  Profile.find({})
  .sort("name")
  .populate("reviews")
  .populate("ownedGames")
  .then(profiles => {
      res.render("profiles/index", {
        title: `All Profiles`,
        profiles,
      })
    })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("reviews")
  .populate("ownedGames")
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        self,
        isSelf
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function addConsole(req, res){
  Profile.findById(req.params.id)
  .populate("reviews")
  .populate("ownedGames")
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render(`profiles/add-console`, {
        title: `Add Console`,
        profile,
        self,
        isSelf
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

function createConsole(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.console.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
}

function edit(req, res) {
  Profile.findById(req.user.profile._id)
  .populate("games")
  .populate("reviews")
  .then(profile => {
    res.render("profiles/edit", {
      title: "Edit Your Profile",
      profile
    })
  })
}

function update(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    if (profile._id.equals(req.user.profile._id)){
      profile.update(req.body, {new: true})
      .then(() => {
        res.redirect(`/profiles/${req.params.id}`)
      })
    }
  })
}