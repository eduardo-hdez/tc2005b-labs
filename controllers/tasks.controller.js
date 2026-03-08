const Tasks = require("../models/tasks.model");

const path = require("path");

exports.getTasks = (request, response, next) => {
  Tasks.fetchAll().then(([rows, fieldData]) => {
    response.render("tasks/index", {
      title: "Tasks",
      username: request.session.username || "",
      tasks: rows,
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
  const task = new Tasks(request.body.title, request.body.description);
  task.save().then(() => {
    return response.redirect("/tasks");
  }).catch(error => {
    console.log(error);
    throw error;
  });
};
