const express = require('express')
const path = require('path')

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

const usersRoute = require('./users')

app.use(
    express.urlencoded({
        extended: true
    }))

app.use(express.json())

app.use('/users', usersRoute)

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})