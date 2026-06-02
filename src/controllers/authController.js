const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { addToBlacklist } = require('../middlewares/authMiddleware');

const SECRET = process.env.JWT_SECRET || 'segredo_dev';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ erro: 'Username e password são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const logout = (req, res) => {
  addToBlacklist(req.token);
  res.json({ mensagem: 'Logout realizado com sucesso' });
};

module.exports = { login, logout };
