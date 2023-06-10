const express = require('express')
const router = express.Router()

const TaskConotroller = require('../controllers/TaskController')

router.get('/add', TaskConotroller.createTask)
router.post('/add', TaskConotroller.saveTask)
router.post('/delete', TaskConotroller.deleteTask)
router.get('/', TaskConotroller.showTasks)

module.exports = router