import mongoose from 'mongoose';

const Decks = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  cartas: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Deck', Decks);