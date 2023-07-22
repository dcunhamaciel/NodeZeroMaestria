const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {
    if (!token) {
        //
    }

    const decoded = jwt.verify(token, 'nossoSecret')

    const userId = decoded.id

    const user = await User.findById(userId)

    return user
}

module.exports = getUserByToken