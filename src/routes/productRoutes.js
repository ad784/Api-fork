const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAll);
/*
  #swagger.tags = ['Produtos']
  #swagger.summary = 'Listar todos os produtos'
  #swagger.description = 'Retorna todos os produtos cadastrados. Aceita filtro opcional por categoria.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.parameters['categoria'] = {
    in: 'query',
    description: 'Filtrar por categoria',
    required: false,
    schema: { type: 'string', example: 'eletrônicos' }
  }
  #swagger.responses[200] = {
    description: 'Lista de produtos retornada com sucesso.',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              nome: { type: 'string' },
              descricao: { type: 'string' },
              preco: { type: 'number' },
              categoria: { type: 'string' },
              estoque: { type: 'number' }
            }
          }
        }
      }
    }
  }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

router.get('/:id', authMiddleware, getById);
/*
  #swagger.tags = ['Produtos']
  #swagger.summary = 'Buscar produto por ID'
  #swagger.description = 'Retorna um único produto pelo seu ID do MongoDB.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do produto (MongoDB ObjectId)',
    required: true,
    schema: { type: 'string', example: '6473b5f1c2a4e800123abcde' }
  }
  #swagger.responses[200] = { description: 'Produto encontrado.' }
  #swagger.responses[400] = { description: 'ID com formato inválido.' }
  #swagger.responses[404] = { description: 'Produto não encontrado.' }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

router.post('/', authMiddleware, create);
/*
  #swagger.tags = ['Produtos']
  #swagger.summary = 'Criar novo produto'
  #swagger.description = 'Cadastra um novo produto no catálogo.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['nome', 'preco'],
          properties: {
            nome: { type: 'string', example: 'Notebook Gamer' },
            descricao: { type: 'string', example: 'Notebook com RTX 4060' },
            preco: { type: 'number', example: 4999.90 },
            categoria: { type: 'string', example: 'eletrônicos' },
            estoque: { type: 'number', example: 15 }
          }
        }
      }
    }
  }
  #swagger.responses[201] = { description: 'Produto criado com sucesso.' }
  #swagger.responses[400] = { description: 'Dados inválidos ou campos obrigatórios ausentes.' }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

router.put('/:id', authMiddleware, update);
/*
  #swagger.tags = ['Produtos']
  #swagger.summary = 'Atualizar produto'
  #swagger.description = 'Atualiza os dados de um produto existente pelo ID.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do produto',
    required: true,
    schema: { type: 'string', example: '6473b5f1c2a4e800123abcde' }
  }
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            nome: { type: 'string', example: 'Notebook Gamer Pro' },
            preco: { type: 'number', example: 5499.90 },
            estoque: { type: 'number', example: 10 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = { description: 'Produto atualizado com sucesso.' }
  #swagger.responses[400] = { description: 'Dados inválidos ou ID com formato inválido.' }
  #swagger.responses[404] = { description: 'Produto não encontrado.' }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

router.delete('/:id', authMiddleware, remove);
/*
  #swagger.tags = ['Produtos']
  #swagger.summary = 'Remover produto'
  #swagger.description = 'Remove um produto do catálogo pelo ID.'
  #swagger.security = [{ bearerAuth: [] }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do produto',
    required: true,
    schema: { type: 'string', example: '6473b5f1c2a4e800123abcde' }
  }
  #swagger.responses[200] = { description: 'Produto removido com sucesso.' }
  #swagger.responses[400] = { description: 'ID com formato inválido.' }
  #swagger.responses[404] = { description: 'Produto não encontrado.' }
  #swagger.responses[401] = { description: 'Token não fornecido ou inválido.' }
*/

module.exports = router;
