const { userModel } = require("../models/users.models");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_TOKEN_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const user = await userModel.findOne({ _id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    })
  );
};
