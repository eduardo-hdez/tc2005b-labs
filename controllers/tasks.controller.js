const Task = require("../models/task.model");

const path = require("path");

exports.getAllTasks = (request, response, next) => {
  Task.fetch(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    return response.render("tasks/index", {
      title: "Tasks",
      username: request.session.username || "",
      isLoggedIn: request.session.isLoggedIn || false,
      tasks: data,
    });
  }).catch(error => {
    console.log(error);
    throw error;
  });
};

exports.getNewTask = (request, response, next) => {
  response.render("tasks/new-task", {
    title: "New Task",
    csrfToken: request.csrfToken(),
    username: request.session.username || "",
    isLoggedIn: request.session.isLoggedIn || false,
  });

};

exports.postNewTask = (request, response, next) => {
  const task = new Task(request.body.title, request.body.description, request.session.username);
  task.save().then(() => {
    return response.redirect("/tasks");
  }).catch(error => {
    console.log(error);
    throw error;
  });
};

exports.getEditTask = (request, response, next) => {
  Task.fetchOne(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    if (data.length === 0) {
      return response.redirect("/tasks");
    }
    response.render("tasks/edit-task", {
      title: "Edit Task",
      csrfToken: request.csrfToken(),
      username: request.session.username || "",
      isLoggedIn: request.session.isLoggedIn || false,
      task: data[0],
    });
  }).catch(error => {
    console.log(error);
    throw error;
  });
};

exports.postEditTask = (request, response, next) => {
  Task.update(request.params.id, request.body.title, request.body.description).then(() => {
    return response.redirect("/tasks");
  }).catch(error => {
    console.log(error);
    throw error;
  });
};
