const bcrypt = require('bcrypt')

const createUserToken = require('../helpers/create-user-token')

const User = require('../models/User')

class UserController {
    static async register(request, response) {
        const { name, email, phone, password, confirmpassword } = request.body

        if (!name) {
            response.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!email) {
            response.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!phone) {
            response.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }

        if (!password) {
            response.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        if (!confirmpassword) {
            response.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }

        if (password !== confirmpassword) {
            response.status(422).json({ message: 'As senhas não conferem!' })
            return            
        }

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            response.status(422).json({ message: 'E-mail já cadastrado!' })
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, request, response)
        } catch(error) {
            response.status(500).json({ message: error })
        }
    }

    static async login(request, response) {
        const { email, password } = request.body

        if (!email) {
            response.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!password) {
            response.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        
        const user = await User.findOne({ email: email })

        if (!user) {
            response.status(422).json({ message: 'Nenhum usuário cadastrado com esse e-mail!' })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            response.status(422).json({ message: 'Senha inválida!' })
            return
        }

        await createUserToken(user, request, response)
    }
}

module.exports = UserController