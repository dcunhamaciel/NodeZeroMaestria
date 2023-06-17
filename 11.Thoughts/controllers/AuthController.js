const bcrypt = require('bcryptjs')
const { UnknownConstraintError } = require('sequelize')

const User = require('../models/User')

class AuthController {

    static login(request, response) {
        response.render('auth/login')
    }

    static logout(request, response) {
        request.session.destroy()
        
        response.redirect('/login')
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

        const checkIfUserExists = await User.findOne({ where: { email: email }})

        if (checkIfUserExists) {
            request.flash('message', 'O e-mail já está em uso!')
            response.render('auth/register')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            request.flash('message', 'Cadastro realizado com sucesso!')

            request.session.userId = createdUser.id

            request.session.save(() => {
                response.redirect('/')
            })
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = AuthController