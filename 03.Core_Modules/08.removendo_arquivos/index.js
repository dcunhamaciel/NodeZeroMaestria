const fs = require('fs')

fs.rename('arquivo.txt', 'novo_arquivo.txt', function(error) {
    if (error) {
        console.log(error)
        return
    }

    console.log('Arquivo renomeado!')
})