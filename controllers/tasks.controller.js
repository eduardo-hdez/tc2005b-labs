const Task = require("../models/task.model");

const path = require("path");

exports.getAllTasks = (request, response, next) => {
  console.log(request.params.id);
  Task.fetch(request.params.id).then(({ data, error }) => {
    if (error) throw error;
    return response.render("tasks/index", {
      title: "Tasks",
      username: request.session.username || "",
      tasks: data,
    });
  }).catch(error => {
    console.log(error);
    throw error;
  });
};

exports.getNewTask = (request, response, next) => {
  response.render("tasks/new", {
    title: "New Task",
    username: request.session.username || "",
  });

};

exports.postNewTask = (request, response, next) => {
  const task = new Task(request.body.title, request.body.description);
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
    response.render("tasks/edit", {
      title: "Edit Task",
      username: request.session.username || "",
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
