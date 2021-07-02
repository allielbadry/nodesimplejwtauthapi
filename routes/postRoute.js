const router = require("express").Router();
const passport = require("passport");
const { userById } = require("../controllers/userController");
const postController = require("../controllers/postController");

const isAuth = passport.authenticate("jwt", { session: false });

router.get("/", isAuth, postController.getPosts);
router.get("/:userId", postController.postByUser);
router.post("/:userId/post", isAuth, postController.createPost);
router.delete("/:userId/:postId", isAuth, postController.deletePost);
router.put("/:userId/:postId", isAuth, postController.postUpdate);

router.param("userId", userById);
router.param("postId", postController.postById);

module.exports = router;
