const Thought = require('../models/Thought')
const User = require('../models/User')

class ThoughtController {

    static async showThoughts(request, response) {
        response.render('home')
    }

    static async dashboard(request, response) {
        response.render('thoughts/dashboard')
    }

    static createThought(request, response) {
        response.render('thoughts/create')
    }

    static async createThoughtPost(request, response) {
        const thought = {
            title: request.body.title,
            UserId: request.session.userid
        }
        
        try {
            await Thought.create(thought)

            request.flash('message', 'Pensamento criado com sucesso!')

            request.session.save(() => {
                response.redirect('/thought/dashboard')
            })
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = ThoughtController