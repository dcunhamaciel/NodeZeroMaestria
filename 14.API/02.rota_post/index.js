const express = require('express')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/createproduct', (request, response) => {
    const name = request.body.name
    const price = request.body.price

    console.log(name)
    console.log(price)

    response.json({
        message: `O produto ${name} foi criado com sucesso!`
    })
})

app.get('/', (request, response) => {
    response.json({
        message: 'Primeira rota criada com sucesso!'
    })
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000 !')
})