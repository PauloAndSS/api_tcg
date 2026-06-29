import mongoose from 'mongoose';

const Users = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  ranking: {
    type: String,
    default: 'Bronze III',
  },
  Decks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck' }],
    default: [],
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', Users);