const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/login', login);
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Login do usuário'
  #swagger.description = 'Autentica o usuário e retorna um token JWT.'
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'admin' },
            password: { type: 'string', example: 'senha123' }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Login bem-sucedido. Retorna o token JWT.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  }
  #swagger.responses[400] = { description: 'Campos obrigatórios não enviados.' }
  #swagger.responses[401] = { description: 'Credenciais inválidas.' }
*/

router.post('/logout', authMiddleware, logout);
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Logout do usuário'
  #swagger.description = 'Invalida o token JWT do usuário logado.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.responses[200] = { description: 'Logout realizado com sucesso.' }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

module.exports = router;
