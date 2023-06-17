const Thought = require('../models/Thought')
const User = require('../models/User')

class ThoughtConotroller {

    static async showThoughts(request, response) {
        response.render('home')
    }
}

module.exports = ThoughtConotroller