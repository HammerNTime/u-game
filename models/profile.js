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
  twitchUrl: [String],
  console: [consoleSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)