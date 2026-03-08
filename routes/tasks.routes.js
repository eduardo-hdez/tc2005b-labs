const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.getTasks);
router.get("/new", tasksController.getNewTask);
router.post("/new", tasksController.postNewTask);

module.exports = router;
