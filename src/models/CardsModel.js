import mongoose from 'mongoose';

const Cards = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['criatura', 'magia', 'campo', 'armadilha'],
    message: 'O tipo deve ser um destes: criatura, magia, campo ou armadilha.'
  },
  custo: {
    type: Number,
    required: true,
  },
  cores: {
    type: [String],
    required: true,
  },
  efeitos: {
    type: [{ nome: String, descricao: String }],
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Card', Cards);