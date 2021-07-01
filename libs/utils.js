const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// private key
const privKeyPath = path.join(__dirname, "..", "/keys/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(privKeyPath, "utf8");

// generate the password and the salt from the user input
function genPassword(password) {
  // gen the salt
  const salt = crypto.randomBytes(32).toString("hex");
  // gen the password
  const genHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return {
    hash: genHash,
    salt: salt,
  };
}

// valid the password when user login if it match what save in DB give him access
function validPassword(password, hash, salt) {
  const verifyPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return hash === verifyPassword;
}

// issue token to user who regitser or when the user login in
function issueJWT(user) {
  const _id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: ["RS256"],
  });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
