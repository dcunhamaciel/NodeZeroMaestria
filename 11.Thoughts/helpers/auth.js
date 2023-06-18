const checkAuth = function(request, response, next) {
    const userId = request.session.userId

    if (!userId) {
        response.redirect('/login')
    }

    next()
}

module.exports = checkAuth;