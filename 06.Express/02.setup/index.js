const express = require('express')

const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('Olá Mundo!')
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})