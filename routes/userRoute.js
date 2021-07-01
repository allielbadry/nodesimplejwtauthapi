const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/signup", userController.createUser);
router.post("/sginin", userController.userLogin);

module.exports = router;
