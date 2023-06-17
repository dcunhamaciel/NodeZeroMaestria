const Thought = require('../models/Thought')
const User = require('../models/User')

class ThoughtController {

    static async showThoughts(request, response) {
        response.render('home')
    }
}

module.exports = ThoughtController