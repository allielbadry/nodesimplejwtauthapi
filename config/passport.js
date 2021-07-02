const fs = require("fs");
const path = require("path");
const User = require("mongoose").model("User");
const jwtStrategy = require("passport-jwt").Strategy;
const jwtExtract = require("passport-jwt").ExtractJwt;

// the public key we use to decrypt the token
const pubKeyPath = path.join(__dirname, "..", "/keys/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pubKeyPath, "utf8");

// options for the passport jwt strategy
options = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// we do the startegy here
const strategy = new jwtStrategy(options, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, null);
    });
});

module.exports = (passport) => {
  passport.use(strategy);
};
