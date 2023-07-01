const express = require('express')

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/createproduct', (request, response) => {
    const name = request.body.name
    const price = request.body.price

    if (!name) {
        response.status(422).json({
            message: "O campo nome é obrigatório!"
        })
    }

    console.log(name)
    console.log(price)

    response.status(201).json({
        message: `O produto ${name} foi criado com sucesso!`
    })
})

app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Primeira rota criada com sucesso!'
    })
    return
})

app.listen(3000, () => {
    console.log('App rodando na porta 3000 !')
})