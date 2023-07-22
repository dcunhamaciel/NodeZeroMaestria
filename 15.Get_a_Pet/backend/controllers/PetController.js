const Pet = require('../models/Pet')

class PetController {
    static async create(request, response) {
        response.json({ message: 'chegou no pet!' })
    }
}

module.exports = PetController