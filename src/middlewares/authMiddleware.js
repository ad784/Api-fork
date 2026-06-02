const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'segredo_dev';

const blacklist = new Set();

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = header.split(' ')[1];

  if (blacklist.has(token)) {
    return res.status(401).json({ erro: 'Token inválido (logout efetuado)' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

const addToBlacklist = (token) => blacklist.add(token);

module.exports = { authMiddleware, addToBlacklist };
