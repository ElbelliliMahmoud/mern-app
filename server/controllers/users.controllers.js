const { helpers } = require("../helpers/helpers");
const { userModel } = require("../models/users.models");
const { StatusCodes } = require("http-status-codes");
const bcryptjs = require("bcryptjs");
const { authSchema } = require("../lib/validators/auth");

/* Add User */
const addUser = async (req, res) => {
  try {
    /* validate register */
    await authSchema.registerSchema.validateAsync(req.body);

    /* check user */
    const existUser = await helpers.checkUser(req.body.email);
    if (existUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "user alredy exist" });
    }

    /* hash password */
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    if (hashedPassword) {
      req.body.password = hashedPassword;
    }

    const user = await userModel.create(req.body);
    const result = await userModel.findById(user._id).select("-password");
    res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.log(error);
    helpers.genericError(error, res);
  }
};

/* Get User */
const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    console.log(error);
    helpers.genericError(error, res);
  }
};

/* Update User */
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    console.log(error);
    helpers.genericError(error, res);
  }
};

/* delete User */
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).send(user);
  } catch (error) {
    console.log(error);
    helpers.genericError(error, res);
  }
};

module.exports.usersController = {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
};
