const express = require('express')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (request, response) => {
    response.json({
        message: 'Primeira rota criada com sucesso!'
    })
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000 !')
})