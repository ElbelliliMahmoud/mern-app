const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users.route.js");
const { authRouter } = require("./routes/auth.route.js");
const passport = require("passport");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", [usersRouter, authRouter]);

/* passport */
app.use(passport.initialize());
require("./security/passport.js")(passport);

/* Database Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

module.exports = app;
