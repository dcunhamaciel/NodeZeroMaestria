const express = require('express')
const path = require('path')

const app = express()
const port = 5000

const basePath = path.join(__dirname, 'templates')
const indexPath = path.join(basePath, 'index.html')

const tasksRoute = require('./tasks')

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    }))

app.use(express.json())

app.use('/tasks', tasksRoute)

app.get('/', (request, response) => {
    response.sendFile(indexPath)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})