const x = 10
const y = 'João'
const z = [1, 2]

// mais de um valor
console.log(x, y, z)

// contagem de impressões
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)

// variável entre string
console.log('O nome é %s', y)

// limpar o console
setTimeout(() => {
    console.clear()    
}, 2000);