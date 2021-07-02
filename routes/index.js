const router = require("express").Router();
const user = require("./userRoute");

router.use("users", user);

module.exports = router;
