const bcrypt = require('bcryptjs')

const User = require('../models/User')

class AuthController {

    static login(request, response) {
        response.render('auth/login')
    }

    static register(request, response) {
        response.render('auth/register')
    }

    static async registerPost(request, response) {
        const { name, email, password, confirmpassword } = request.body

        if (password != confirmpassword) {
            request.flash('message', 'As senhas não conferem, tente novamente!')
            response.render('auth/register')

            return
        }

        //
    }
}

module.exports = AuthController