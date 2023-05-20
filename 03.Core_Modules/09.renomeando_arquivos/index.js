const fs = require('fs')

fs.unlink('arquivo.txt', function(error) {
    if (error) {
        console.log(error)
        return
    }

    console.log('Arquivo removido!')
})