const Task = require('../models/Task')

class TaskController {

    static showTasks(request, response) {
        response.render('task/all')
    }

    static createTask(request, response) {
        response.render('task/create')
    }    
}

module.exports = TaskController