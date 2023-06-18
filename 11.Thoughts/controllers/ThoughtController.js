const Thought = require('../models/Thought')
const User = require('../models/User')

class ThoughtController {

    static async showThoughts(request, response) {
        response.render('home')
    }

    static async dashboard(request, response) {
        const userId = request.session.userid

        const user = await User.findOne({ 
            where: { 
                id: userId 
            },
            include: Thought,
            plain: true
        })

        if (!user) {
            request.redirect('/login')
        }

        const thoughts = user.Thoughts.map((result) => result.dataValues)

        const emptyThoughts = thoughts.length === 0

        response.render('thoughts/dashboard', { thoughts, emptyThoughts })
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
    
    static async removeThought(request, response) {
        const id = request.body.id
        const userid = request.session.userid
        
        try {
            await Thought.destroy({ where: { id: id, UserId: userid }})

            request.flash('message', 'Pensamento excluído com sucesso!')

            request.session.save(() => {
                response.redirect('/thought/dashboard')
            })
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = ThoughtController