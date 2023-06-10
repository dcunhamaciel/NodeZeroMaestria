const express = require('express')
const router = express.Router()

const TaskConotroller = require('../controllers/TaskController')

router.get('/add', TaskConotroller.createTask)
router.post('/add', TaskConotroller.saveTask)
router.get('/edit/:id', TaskConotroller.editTask)
router.post('/edit', TaskConotroller.updateTask)
router.post('/delete', TaskConotroller.deleteTask)
router.post('/updatestatus', TaskConotroller.toggleStatusTask)
router.get('/', TaskConotroller.showTasks)

module.exports = router