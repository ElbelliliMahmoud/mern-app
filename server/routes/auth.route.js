const express = require("express");
const { usersController } = require("../controllers/users.controllers.js");

const router = express.Router();

/* register */
router.post("/register", usersController.addUser);

module.exports.authRouter = router;
