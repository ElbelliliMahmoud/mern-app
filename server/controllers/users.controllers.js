const { userModel } = require("../models/users.models");

/* Add User */
const addUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

/* Get User */
const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

/* Update User */
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

/* delete User */
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
};

module.exports.usersController = {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
};
