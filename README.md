# Catalogo de Produtos API

Uma API RESTful em **Node.js** e **Express** para gerenciamento de catalogo de produtos com **autenticacao JWT**, **persistencia MongoDB** e **documentacao Swagger**.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Swagger UI
- dotenv
- bcryptjs

## Funcionalidades

- Autenticacao com JWT
- Rotas protegidas via middleware
- CRUD de produtos
- Documentacao interativa em Swagger
- Sanitizacao de dados com `express-mongo-sanitize`

## Requisitos

- Node.js 18+
- MongoDB em execucao local ou remota
- Git

## Estrutura do projeto

- `src/server.js` - inicializacao do servidor e configuracao das rotas
- `src/config/swagger.js` - geracao de documentacao Swagger
- `src/routes/authRoutes.js` - rotas de autenticacao
- `src/routes/productRoutes.js` - rotas de produtos
- `src/models` - modelos Mongoose
- `src/controllers` - logica de negocios
- `src/middlewares` - middlewares de autenticacao

## Instalacao e execucao

1. Entre na pasta do projeto:

```bash
cd projeto
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie um arquivo `.env` a partir do modelo:

```bash
copy .env.example .env
```

4. Edite `.env` caso necessario:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/catalogo
JWT_SECRET=SeuSegredoJWT
```

5. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

6. Acesse a API:

- `http://localhost:3000/`
- `http://localhost:3000/api-docs`

## Documentacao Swagger

A documentacao interativa esta disponivel em:

- `http://localhost:3000/api-docs`

Para atualizar o arquivo de documentacao Swagger, execute:

```bash
npm run swagger
```

## Endpoints principais

- `POST /auth/login`
- `POST /auth/logout`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

> Observacao: as rotas de produtos exigem token JWT valido no cabecalho `Authorization: Bearer <token>`.

## Notas

- A aplicacao utiliza MongoDB e nao MySQL.
- O Swagger foi configurado para exibir os endpoints de autenticacao e produtos.
- Se preferir, mantenha o MongoDB local automatizado com um servico ou inicie o `mongod` manualmente com `--dbpath`.

## Repositorio

https://github.com/ad784/Api-rest-cat-podrutos.git
