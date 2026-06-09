const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Catálogo de Produtos API',
    description: 'API REST para gerenciamento de catálogo de produtos com autenticação JWT e documentação Swagger.',
    version: '1.0.0',
    contact: {
      name: 'Ad784',
      url: 'https://github.com/ad784',
      email: 'contato@exemplo.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local de desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints de autenticação',
    },
    {
      name: 'Produtos',
      description: 'CRUD de produtos do catálogo',
    },
  ],
};

const outputFile = './src/swagger_output.json';
const routes = ['./src/routes/authRoutes.js', './src/routes/productRoutes.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('swagger_output.json gerado com sucesso!');
});
