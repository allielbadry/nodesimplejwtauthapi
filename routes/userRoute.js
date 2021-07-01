const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/signup", userController.createUser);

module.exports = router;
