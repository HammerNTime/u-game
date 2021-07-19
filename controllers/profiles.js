import { Profile } from "../models/profile.js"
import { Review } from "../models/review.js"
import { Game } from "../models/game.js"



export {
  show
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
