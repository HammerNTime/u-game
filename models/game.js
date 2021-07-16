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
  imageUrl: String,
  ownedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
}, {
  timestamps: true
})

const Game = mongoose.model("Game", gameSchema)