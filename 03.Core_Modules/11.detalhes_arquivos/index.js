const fs = require('fs')

fs.stat('novo_arquivo.txt', (error, stats) => {
    if (error) {
        console.log(error)
        return
    }

    console.log(`É arquivo: ${stats.isFile()}`)
    console.log(`É diretório: ${stats.isDirectory()}`)
    console.log(`Data criação: ${stats.ctime}`)  
    console.log(`Tamanho: ${stats.size}`)  
})