const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (request, response) => {
    const userId = request.params.id

    console.log(`Buscando pelo usuário ${userId}.`)

    response.sendFile(`${basePath}/users.html`)
})

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})