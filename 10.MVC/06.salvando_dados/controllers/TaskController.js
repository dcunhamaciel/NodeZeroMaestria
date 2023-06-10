const Task = require('../models/Task')

class TaskController {

    static showTasks(request, response) {
        response.render('task/all')
    }

    static createTask(request, response) {
        response.render('task/create')
    }
    
    static async saveTask(request, response) {
        const task = {
            title: request.body.title,
            description: request.body.description,
            done: false
        }

        await Task.create(task)

        response.redirect('/task')
    }    
}

module.exports = TaskController