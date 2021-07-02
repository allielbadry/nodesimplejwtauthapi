const userController = require("../controllers/userController");
const router = require("express").Router();
const passport = require("passport");

const isAuth = passport.authenticate("jwt", { session: false });

router.post("/signup", userController.createUser);
router.post("/signin", userController.userLogin);
router.get("/users/:userId", isAuth, userController.getUser);

router.param("userId", userController.userById);

module.exports = router;
