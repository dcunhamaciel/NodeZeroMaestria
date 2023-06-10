const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_mvc', 'postgres', 'masterkey', {
    host: 'localhost',
    dialect: 'postgres'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao Banco de Dados com Sequelize!')
} catch(error) {
    console.log('Não foi possível conectar no Banco de Dados: ', error)
}

module.exports = sequelize