const Task = require('../models/Task')

class TaskController {

    static async showTasks(request, response) {
        const tasks = await Task.findAll({ raw: true })

        response.render('task/all', { tasks })
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

    static async deleteTask(request, response) {
        const id = request.body.id

        await Task.destroy({ where: { id: id }})

        response.redirect('/task')
    }
}

module.exports = TaskController