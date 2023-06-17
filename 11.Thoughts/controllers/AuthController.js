const bcrypt = require('bcryptjs')
const { UnknownConstraintError } = require('sequelize')

const User = require('../models/User')

class AuthController {

    static login(request, response) {
        response.render('auth/login')
    }

    static async loginPost(request, response) {
        const { email, password } = request.body

        const user = await User.findOne({ where: { email: email }})

        if (!user) {
            request.flash('message', 'Usuário não encontrado!')
            response.render('auth/login')

            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            request.flash('message', 'Senha inválida!')
            response.render('auth/login')

            return
        }

        request.flash('message', 'Autenticação realizada com sucesso!')

        request.session.userId = user.id

        request.session.save(() => {
            response.redirect('/')
        })
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