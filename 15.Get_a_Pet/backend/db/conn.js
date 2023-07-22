const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log('Conectado ao MongoDB!')
}

main().catch((error) => console.log(error))

module.exports = mongoose