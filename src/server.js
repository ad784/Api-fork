require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(mongoSanitize());

app.get('/', (req, res) => {
  res.json({
    message: 'API Catalogo de Produtos rodando',
    endpoints: {
      auth: '/auth',
      products: '/products',
      swagger: '/api-docs'
    }
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/catalogo';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
  })
  .catch((err) => console.error('Erro ao conectar MongoDB:', err));
