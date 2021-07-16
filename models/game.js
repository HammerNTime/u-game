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
  reviews: [{}]
})

const Game = mongoose.model("Game", gameSchema)