const express = require("express");
const { usersController } = require("../controllers/users.controllers.js");
const { authController } = require("../controllers/auth.controllers.js");

const router = express.Router();

/* register */
router.post("/register", usersController.addUser);
router.post("/login", authController.Login);

module.exports.authRouter = router;
