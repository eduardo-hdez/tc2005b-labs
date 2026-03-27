const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.getSignup = (request, response, next) => {
  response.render('signup', {
    title: 'Signup',
    csrfToken: request.csrfToken(),
    username: request.session.username || '',
    isLoggedIn: request.session.isLoggedIn || false,
    privilegios: request.session.privilegios || [],
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
  request.session.error = '';
  response.render('login', {
    title: 'Login',
    csrfToken: request.csrfToken(),
    isLoggedIn: request.session.isLoggedIn || '',
    error: error,
    username: request.session.username || '',
    privilegios: request.session.privilegios || [],
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
        return User.fetchPrivileges(request.body.username).then(({ data: privData, error: privError }) => {
          if (privError) throw privError;
          const privilegios = (privData || []).map(p => ({
            name_privilege: p.privileges.name_privilege
          }));
          request.session.privilegios = privilegios;
          return request.session.save(() => {
            return response.redirect('/tasks');
          });
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

exports.getUsersList = (request, response, next) => {
  User.fetchAll().then(({ data, error }) => {
    if (error) throw error;
    response.render('users/index', {
      title: 'Users',
      csrfToken: request.csrfToken(),
      username: request.session.username || '',
      isLoggedIn: request.session.isLoggedIn || false,
      privilegios: request.session.privilegios || [],
      users: data,
    });
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.postDeleteUser = (request, response, next) => {
  if (request.params.username === request.session.username) {
    request.session.error = 'No puedes eliminar tu propia cuenta.';
    return response.redirect('/users/list');
  }
  User.deleteUser(request.params.username).then(() => {
    return response.redirect('/users/list');
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.getAssignRole = (request, response, next) => {
  let allRoles = [];
  User.fetchAllRoles().then(({ data: rolesData, error: rolesError }) => {
    if (rolesError) throw rolesError;
    allRoles = rolesData || [];
    return User.fetchUserRoles(request.params.username);
  }).then(({ data: userRolesData, error: userRolesError }) => {
    if (userRolesError) throw userRolesError;
    const userRoleIds = (userRolesData || []).map(r => r.id_role);
    response.render('users/assign-role', {
      title: 'Assign Role',
      csrfToken: request.csrfToken(),
      username: request.session.username || '',
      isLoggedIn: request.session.isLoggedIn || false,
      privilegios: request.session.privilegios || [],
      targetUsername: request.params.username,
      allRoles: allRoles,
      userRoleIds: userRoleIds,
    });
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.postAssignRole = (request, response, next) => {
  User.assignRole(request.params.username, request.body.id_role).then(({ error }) => {
    if (error) throw error;
    return response.redirect('/users/' + request.params.username + '/assign-role');
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};

exports.postRemoveRole = (request, response, next) => {
  User.removeRole(request.params.username, request.body.id_role).then(({ error }) => {
    if (error) throw error;
    return response.redirect('/users/' + request.params.username + '/assign-role');
  }).catch((error) => {
    console.log(error);
    next(error);
  });
};
