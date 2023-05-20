const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
const nome = args['nome']

console.log(args)
console.log(nome)