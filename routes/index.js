const router = require("express").Router();
const user = require("./userRoute");
const post = require("./postRoute");

router.use("/", post);
router.use("/users", user);

module.exports = router;
