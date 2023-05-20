const _ = require('lodash')

const a = [1, 2, 3, 4, 5]
const b = [2, 4, 6, 7, 8]

const diffA = _.difference(a, b)
const diffB = _.difference(b, a)

console.log(diffA)
console.log(diffB)