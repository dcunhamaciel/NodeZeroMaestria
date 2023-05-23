const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

const checkAuth = function(request, response, next) {
    request.authStatus = true

    if (request.authStatus) {
        console.log('Está logado, pode continuar.')
        next()
    } else {
        console.log('Não está logado, faça o login para continuar.')
        next()
    }
}

app.use(checkAuth)

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})