const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

const isAuth = require("../util/isAuth");
const canViewUsers = require("../util/canViewUsers");
const canManageUsers = require("../util/canManageUsers");
const canAssignRoles = require("../util/canAssignRoles");

router.get("/signup", usersController.getSignup);
router.post("/signup", usersController.postSignup);
router.get("/login", usersController.getLogin);
router.post("/login", usersController.postLogin);
router.get("/logout", usersController.getLogout);

router.get("/list", isAuth, canViewUsers, usersController.getUsersList);
router.post("/:username/delete", isAuth, canManageUsers, usersController.postDeleteUser);
router.get("/:username/assign-role", isAuth, canAssignRoles, usersController.getAssignRole);
router.post("/:username/assign-role", isAuth, canAssignRoles, usersController.postAssignRole);
router.post("/:username/remove-role", isAuth, canAssignRoles, usersController.postRemoveRole);

module.exports = router;
