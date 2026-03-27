const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

const isAuth = require("../util/isAuth");
const canCreateTask = require("../util/canCreateTask");
const canViewOwnTasks = require("../util/canViewOwnTasks");
const canUpdateOwnTask = require("../util/canUpdateOwnTask");
const canDeleteOwnTask = require("../util/canDeleteOwnTask");

router.get("/", isAuth, canViewOwnTasks, tasksController.getAllTasks);
router.get("/new-task", isAuth, canCreateTask, tasksController.getNewTask);
router.post("/new-task", isAuth, canCreateTask, tasksController.postNewTask);
router.get("/:id/edit-task", isAuth, canUpdateOwnTask, tasksController.getEditTask);
router.post("/:id/edit-task", isAuth, canUpdateOwnTask, tasksController.postEditTask);
router.post("/:id/delete", isAuth, canDeleteOwnTask, tasksController.postDeleteTask);

module.exports = router;
