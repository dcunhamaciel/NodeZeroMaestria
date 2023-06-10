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

    static async editTask(request, response) {
        const id = request.params.id

        const task = await Task.findOne({ raw: true, where: { id : id }})

        response.render('task/edit', { task })
    }

    static async updateTask(request, response) {
        const id = request.body.id

        const task = {
            title: request.body.title,
            description: request.body.description
        }

        console.log('teste', id, task)

        await Task.update(task, { where: { id: id }})

        response.redirect('/task')
    }

    static async deleteTask(request, response) {
        const id = request.body.id

        await Task.destroy({ where: { id: id }})

        response.redirect('/task')
    }
}

module.exports = TaskController