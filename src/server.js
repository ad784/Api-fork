require('dotenv').config()
const app = require('./app')
const { initializeDatabase } = require('./config/database')

const PORT = process.env.PORT || 3000

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
  })
}

initializeDatabase().then(() => {
  startServer()
}).catch((err) => {
  console.error('erro ao conectar no mysql:', err.message)

  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }

  console.warn('iniciando api sem mysql em modo desenvolvimento')
  startServer()
})
