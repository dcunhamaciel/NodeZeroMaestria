const jwt = require('jsonwebtoken')

const createUserToken = async (user, request, response) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name        
    }, "nossoSecret")

    response.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken