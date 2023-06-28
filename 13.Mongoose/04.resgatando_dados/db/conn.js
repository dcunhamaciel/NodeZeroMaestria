const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/mongoose_node'

async function main() {
    await mongoose.connect(uri)
    console.log('Conectado ao MongoDB via Mongoose!')
}

main().catch((error) => console.log(error))

module.exports = mongoose