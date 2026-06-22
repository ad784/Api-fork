const mysql = require('mysql2/promise')

const database = process.env.DB_NAME || 'loja'

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0
}

const pool = mysql.createPool({
  ...connectionConfig,
  database
})

const initializeDatabase = async () => {
  const bootstrapPool = mysql.createPool(connectionConfig)

  await bootstrapPool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  await bootstrapPool.end()

  await pool.query('SELECT 1')

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(120) NOT NULL,
      senha VARCHAR(255) NOT NULL,
      perfil ENUM('user', 'admin') NOT NULL DEFAULT 'admin',
      criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id_usuario),
      UNIQUE KEY email_UNIQUE (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categorias (
      id_categoria INT UNSIGNED NOT NULL AUTO_INCREMENT,
      nome VARCHAR(100) NOT NULL,
      criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id_categoria),
      UNIQUE KEY nome_UNIQUE (nome)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  console.log('mysql conectado')
}

module.exports = {
  pool,
  initializeDatabase
}
