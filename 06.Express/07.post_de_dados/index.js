const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

app.use(
    express.urlencoded({
        extended: true
    }))

app.use(express.json())

app.get('/users/add', (request, response) => {
    response.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (request, response) => {
    const name = request.body.name
    const age = request.body.age

    console.log(`O nome do usuário é ${name} e a idade é ${age}.`)

    response.sendFile(`${basePath}/userform.html`)
})

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