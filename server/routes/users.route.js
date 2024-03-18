const express = require("express");
const { usersController } = require("../controllers/users.controllers.js");

const router = express.Router();

/* Add User */
router.post("/users", usersController.addUser);
/* find User */
router.get("/users", usersController.getAllUser);
/* update User */
router.put("/users/:id", usersController.updateUser);
/* delete User */
router.delete("/users/:id", usersController.deleteUser);

module.exports.usersRouter = router;
