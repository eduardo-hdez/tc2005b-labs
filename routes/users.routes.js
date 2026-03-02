const express = require("express");
const router = express.Router();

// HTML
const htmlHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lab 11 - Express</title>
</head>
<body>

<header>
    <h1>Create New User</h1>
</header>
`;

const htmlForm = `
<form action="/users/new" method="POST">
    
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <br><br>

    <label for="description">Description:</label>
    <input type="text" id="description" name="description" required>
    <br><br>

    <button type="submit">Save User</button>

</form>
`;

const htmlFooter = `
<footer>
    <p>Lab 11 - Express</p>
</footer>

</body>
</html>
`;

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
  response.send(htmlHeader + htmlForm + htmlFooter);
});

router.post("/new", (request, response, next) => {
  users.push(request.body);
  response.redirect("/users");
});

router.use((request, response, next) => {
  console.log("Another middleware!");
  let htmlIndex = `
    <a href="/users/new"><button>New user</button></a>
    <div>`;

  for (let user of users) {
    htmlIndex += `
      <div>
        <h2>${user.name}</h2>
        <p>${user.description}</p>
      </div>`;
  }

  htmlIndex += `
    </div>`;

  response.send(htmlHeader + htmlIndex + htmlFooter);
});

module.exports = router;
