import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Game
}

const gameSchema = new Schema({
  title: String,
  description: String,
  genre: {type: [String],
    
  },
  ownedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
  guideUrl: [String],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
})

const Game = mongoose.model("Game", gameSchema)