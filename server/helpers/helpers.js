const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../models/users.models");

const checkUser = async (email) => {
  const existUser = await userModel.findOne({ email });
  return existUser;
};

const genericError = (error, res, status) => {
  return process.env.NODE_ENV === "development"
    ? res.status(status ?? StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    : res
        .status(status ?? StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "server error" });
};

module.exports.helpers = {
  checkUser,
  genericError,
};
