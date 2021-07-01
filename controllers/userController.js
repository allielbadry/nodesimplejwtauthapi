const User = require("mongoose").model("User");
const utils = require("../libs/utils");
const passport = require("passport");

module.exports = {
  createUser: (req, res, next) => {
    const hashPass = utils.genPassword(req.body.password);
    const hash = hashPass.hash;
    const salt = hashPass.salt;
    const userParams = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      hash: hash,
      salt: salt,
    };
    const newUser = new User(userParams);
    newUser.save((err, user) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      const jwt = utils.issueJWT(user);
      const { fullName, email } = user;
      return res.json({
        fullName,
        email,
        token: jwt.token,
        expires: jwt.expires,
      });
    });
  },
};
