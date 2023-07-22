const User = require('../models/User')

class UserController {
    static async register(request, response) {
        response.json('Olá Get a Pet')
    }
}

module.exports = UserController