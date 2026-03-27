module.exports = (request, response, next) => {
    let continuar = true;
    for (let privilegio of request.session.privilegios) {
        if (privilegio.name_privilege == 'Update own task') {
            next();
            continuar = false;
        }
    }
    if (continuar) {
        request.session.error = "You dont have permission to do this action.";
        return response.redirect('/users/login');
    }
}
