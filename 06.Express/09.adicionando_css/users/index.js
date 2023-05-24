const express = require('express')
const path = require('path')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/add', (request, response) => {
    response.sendFile(`${basePath}/userform.html`)
})

router.post('/save', (request, response) => {
    const name = request.body.name
    const age = request.body.age

    console.log(`O nome do usuário é ${name} e a idade é ${age}.`)

    response.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (request, response) => {
    const userId = request.params.id

    console.log(`Buscando pelo usuário ${userId}.`)

    response.sendFile(`${basePath}/users.html`)
})

module.exports = router