import mongoose from 'mongoose'

export {
  Profile
}

const consoleSchema = new mongoose.Schema({
  system: String,
  gamerTag: String,
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  bio: String,
  twitchUrl: [String],
  ownedGames: [{type: mongoose.Schema.Types.ObjectId, ref: "Game"}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
  console: [consoleSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)