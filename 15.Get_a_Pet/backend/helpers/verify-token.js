const jwt = require('jsonwebtoken')

const getToken = require('./get-token')

const verifyToken = async (request, response, next) => {
    if (!request.headers.authorization) {
        return response.status(401).json({ message: 'Acesso negado!' })
    }    

    const token = await getToken(request)

    if (!token) {
        return response.status(401).json({ message: 'Acesso negado!' })
    }

    try {
        const verified = jwt.verify(token, 'nossoSecret')

        request.user = verified

        next()
    } catch(error) {
        return response.status(400).json({ message: 'Token inválido!' })
    }
}

module.exports = verifyToken