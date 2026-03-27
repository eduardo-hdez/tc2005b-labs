module.exports = (request, response, next) => {
    if (request.session.isLoggedIn) {
        return next();
    }
    return response.redirect('/users/login');
}
