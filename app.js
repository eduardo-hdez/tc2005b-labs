const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const routeUsers = require("./routes/users.routes.js");
app.use("/users", routeUsers);

app.listen(3000);
