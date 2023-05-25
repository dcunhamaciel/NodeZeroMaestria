const express = require('express')
const path = require('path')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')
const taskPath = path.join(basePath, 'task.html')

router.get('/add', (request, response) => {
    response.sendFile(taskPath)
})

router.post('/save', (request, response) => {
    const task = request.body.task

    console.log(`A tarefa é ${task}.`)

    response.sendFile(taskPath)
})

module.exports = router