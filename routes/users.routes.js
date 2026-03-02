const express = require("express");
const router = express.Router();

// Data
const users = [
  {
    name: "eduardo-hdez",
    description: "Computer Science and Technology",
  },
  {
    name: "elias-franco",
    description: "Robotics and Digital Systems Engineering",
  },
];

// Middleware
router.use((request, response, next) => {
  console.log("¡I'm a middleware!");
  next();
});

router.get("/new", (request, response, next) => {
  response.render("users/new", { title: "Create New User" });
});

router.post("/new", (request, response, next) => {
  users.push(request.body);
  response.redirect("/users");
});

router.use((request, response, next) => {
  console.log("Another middleware!");
  response.render("users/index", { title: "Users", users: users });
});

module.exports = router;
