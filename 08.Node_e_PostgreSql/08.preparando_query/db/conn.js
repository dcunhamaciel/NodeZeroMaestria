const { Pool } = require('pg')
 
const pool = new Pool({
    host: 'localhost',
    database: 'node',
    user: 'postgres',    
    password: 'masterkey',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

module.exports = pool