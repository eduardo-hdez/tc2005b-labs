exports.getLogin = (request, response, next) => {
  response.render("Login/index", { title: "Login" })
};

exports.postLogin = (request, response, next) => {};

exports.getLogout = (request, response, next) => {};