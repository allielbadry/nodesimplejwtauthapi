const User = require("mongoose").model("User");
const utils = require("../libs/utils");

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
  userLogin: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.json({
            error: "User is not found",
          });
        }
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        );
        if (isValid) {
          const jwt = utils.issueJWT(user);
          return res.json({
            message: "Login Succesful",
            token: jwt.token,
            expires: jwt.expires,
          });
        } else {
          return res.json({
            message: "Email or Password doenst match",
          });
        }
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
};
