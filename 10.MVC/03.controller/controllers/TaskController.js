const Task = require('../models/Task')

class TaskController {
    static createTask(request, response) {
        response.render('task/create')
    }
}

module.exports = TaskController