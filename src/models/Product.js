const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo'],
    },
    categoria: {
      type: String,
      trim: true,
    },
    estoque: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
