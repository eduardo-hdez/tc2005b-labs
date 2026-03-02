const express = require("express");
const fs = require("fs");
const router = express.Router();

// Data
const tasks = [
  {
    title: "Do the lab",
    description: "Do lab11 from last class",
  },
  {
    title: "Do automata homework",
    description: "Do automata homework from last week",
  },
];

// Middleware
router.use((request, response, next) => {
  console.log("Tasks middleware!");
  next();
});

router.get("/new", (request, response, next) => {
  response.render("tasks/new", { title: "Create New Task" });
});

router.post("/new", (request, response, next) => {
  tasks.push(request.body);
  fs.appendFileSync("tasks.txt", `${request.body.title}, ${request.body.description}\n`);
  response.redirect("/tasks");
});

router.use((request, response, next) => {
  console.log("Another tasks middleware!");
  response.render("tasks/index", { title: "Tasks", tasks: tasks });
});

module.exports = router;
