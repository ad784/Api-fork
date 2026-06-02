const Product = require('../models/Product');

const getAll = async (req, res) => {
  try {
    const { categoria } = req.query;
    const filtro = categoria ? { categoria } : {};
    const products = await Product.find(filtro);
    res.json(products);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(product);
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
};

const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido' });
  }
};

module.exports = { getAll, getById, create, update, remove };
