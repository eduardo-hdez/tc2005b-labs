const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.getAllTasks);
router.get("/new-task", tasksController.getNewTask);
router.post("/new-task", tasksController.postNewTask);
router.get("/:id/edit-task", tasksController.getEditTask);
router.post("/:id/edit-task", tasksController.postEditTask);
router.get("/:id", tasksController.getAllTasks);

module.exports = router;
