const Task = require("../models/task.model");

const hasPrivilege = (request, name) =>
  (request.session.privilegios || []).some(p => p.name_privilege === name);

exports.getAllTasks = (request, response, next) => {
  const fetchPromise = hasPrivilege(request, 'view_all_tasks')
    ? Task.fetchAll()
    : Task.fetchByUser(request.session.username);

  fetchPromise.then(({ data, error }) => {
    if (error) throw error;
    return response.render("tasks/index", {
      title: "Tasks",
      csrfToken: request.csrfToken(),
      username: request.session.username || "",
      isLoggedIn: request.session.isLoggedIn || false,
      privilegios: request.session.privilegios || [],
      tasks: data || [],
    });
  }).catch(error => {
    console.log(error);
    next(error);
  });
};

exports.getNewTask = (request, response, next) => {
  response.render("tasks/new-task", {
    title: "New Task",
    csrfToken: request.csrfToken(),
    username: request.session.username || "",
    isLoggedIn: request.session.isLoggedIn || false,
    privilegios: request.session.privilegios || [],
  });
};

exports.postNewTask = (request, response, next) => {
  const task = new Task(request.body.title, request.body.description, request.session.username);
  task.save().then(() => {
    return response.redirect("/tasks");
  }).catch(error => {
    console.log(error);
    next(error);
  });
};

exports.getEditTask = (request, response, next) => {
  Task.fetchOne(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    if (!data || data.length === 0) {
      return response.redirect("/tasks");
    }
    const task = data[0];
    if (task.username !== request.session.username && !hasPrivilege(request, 'update_any_task')) {
      request.session.error = "No tienes privilegios para este recurso, el incidente ha sido reportado.";
      return response.redirect('/users/login');
    }
    response.render("tasks/edit-task", {
      title: "Edit Task",
      csrfToken: request.csrfToken(),
      username: request.session.username || "",
      isLoggedIn: request.session.isLoggedIn || false,
      privilegios: request.session.privilegios || [],
      task: task,
    });
  }).catch(error => {
    console.log(error);
    next(error);
  });
};

exports.postEditTask = (request, response, next) => {
  Task.fetchOne(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    if (!data || data.length === 0) {
      return response.redirect("/tasks");
    }
    const task = data[0];
    if (task.username !== request.session.username && !hasPrivilege(request, 'update_any_task')) {
      request.session.error = "No tienes privilegios para este recurso, el incidente ha sido reportado.";
      return response.redirect('/users/login');
    }
    return Task.update(request.params.id, request.body.title, request.body.description).then(() => {
      return response.redirect("/tasks");
    });
  }).catch(error => {
    console.log(error);
    next(error);
  });
};

exports.postDeleteTask = (request, response, next) => {
  Task.fetchOne(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    if (!data || data.length === 0) {
      return response.redirect("/tasks");
    }
    const task = data[0];
    if (task.username !== request.session.username && !hasPrivilege(request, 'delete_any_task')) {
      request.session.error = "No tienes privilegios para este recurso, el incidente ha sido reportado.";
      return response.redirect('/users/login');
    }
    return Task.delete(request.params.id).then(() => {
      return response.redirect("/tasks");
    });
  }).catch(error => {
    console.log(error);
    next(error);
  });
};
