const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

const session = require("express-session");
app.use(session({
  secret: "secret (change this to a more secure secret in production scenarios)",
  resave: false,
  saveUninitialized: false,
}));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
  response.locals.privilegios = request.session.privilegios || [];
  next();
});

app.get("/", (request, response) => response.redirect("/users/login"));

const routeUsers = require("./routes/users.routes.js");
app.use("/users", routeUsers);

const routeTasks = require("./routes/tasks.routes.js");
app.use("/tasks", routeTasks);

app.use((request, response, next) => {
  response.status(404).send("This page does not exist");
});

app.listen(3000);
