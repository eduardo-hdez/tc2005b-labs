const Tasks = require("../models/tasks.model");

const path = require("path");

exports.getTasks = (request, response, next) => {
  const tasks = Tasks.fetchAll();
  response.render("tasks/index", { tasks: tasks, title: "Tasks" });
};

exports.getNewTask = (request, response, next) => {
  response.render("tasks/new", { title: "New Task" });
};

exports.postNewTask = (request, response, next) => {
  const task = new Tasks(request.body.title, request.body.description);
  task.save();
  response.redirect("/tasks");
};
