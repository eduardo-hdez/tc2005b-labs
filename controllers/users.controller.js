const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.getSignup = (request, response, next) => {
  response.render('signup', {
    title: 'Signup',
    csrfToken: request.csrfToken(),
    username: request.session.username || '',
  });
}

exports.postSignup = (request, response, next) => {
  const user = new User(request.body.username, request.body.password, request.body.name);
  user.save().then(() => {
    return response.redirect('/users/login');
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.getLogin = (request, response, next) => {
  const error = request.session.error || '';
  response.render('login', {
    title: 'Login',
    csrfToken: request.csrfToken(),
    isLoggedIn: request.session.isLoggedIn || '',
    error: error,
    username: request.session.username || '',
  })
};

exports.postLogin = (request, response, next) => {
  User.fetchOne(request.body.username).then(({ data, error }) => {
    if (!data || data.length < 1) {
      request.session.error = 'Invalid username or password';
      return response.redirect('/users/login');
    }
    return bcrypt.compare(request.body.password, data[0].password).then((doMatch) => {
      if (doMatch) {
        request.session.isLoggedIn = true;
        request.session.username = request.body.username;
        return request.session.save(() => {
          return response.redirect('/tasks');
        });
      } else {
        request.session.error = 'Invalid username or password';
        return response.redirect('/users/login');
      }
    });
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.getLogout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect('/users/login');
  })
};