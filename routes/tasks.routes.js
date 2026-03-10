const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.getAllTasks);
router.get("/new", tasksController.getNewTask);
router.post("/new", tasksController.postNewTask);
router.get("/:id/edit", tasksController.getEditTask);
router.post("/:id/edit", tasksController.postEditTask);
router.get("/:id", tasksController.getAllTasks);

module.exports = router;
