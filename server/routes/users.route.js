const express = require("express");
const { usersController } = require("../controllers/users.controllers.js");
const passport = require("passport");

const router = express.Router();

/* Add User */
router.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersController.addUser
);
/* find User */
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersController.getAllUser
);
/* update User */
router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.updateUser
);
/* delete User */
router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.deleteUser
);

module.exports.usersRouter = router;
