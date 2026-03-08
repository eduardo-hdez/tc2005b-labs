exports.getLogin = (request, response, next) => {
  response.render("Login/index", { title: "Login" })
};

exports.postLogin = (request, response, next) => {
  request.session.username = request.body.username;
  response.redirect("/tasks");
};

exports.getLogout = (request, response, next) => {};