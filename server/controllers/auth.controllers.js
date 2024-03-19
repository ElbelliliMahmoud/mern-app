const { StatusCodes } = require("http-status-codes");
const { helpers } = require("../helpers/helpers");
const { authSchema } = require("../lib/validators/auth");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    /* validate login */
    await authSchema.loginSchema.validateAsync(req.body);

    /* check user */
    const existUser = await helpers.checkUser(req.body.email);
    if (!existUser) {
      return helpers.genericError("user not found", res, StatusCodes.NOT_FOUND);
    }

    /* check password */
    const isMatch = await bcryptjs.compare(
      req.body.password,
      existUser.password
    );
    if (!isMatch) {
      helpers.genericError("wrong password", res, StatusCodes.BAD_REQUEST);
    }

    /* create token */
    const payload = {
      id: existUser._id,
      name: existUser.name,
      email: existUser.email,
      role: existUser.role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.send({ accessToken, refreshToken });
  } catch (error) {
    helpers.genericError(error, res);
  }
};

module.exports.authController = {
  Login,
};
