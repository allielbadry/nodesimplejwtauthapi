const Post = require("../models/postModel");
const _ = require("lodash");

module.exports = {
  createPost: (req, res, next) => {
    const postParam = {
      title: req.body.title,
      body: req.body.body,
      created: Date.now(),
    };
    const post = new Post(postParam);
    req.user.hash = undefined;
    req.user.salt = undefined;
    post.user = req.user;
    post.save((err, result) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      return res.json(result);
    });
  },
  getPosts: (req, res, next) => {
    const post = Post.find()
      .populate("user", "_id name email")
      .select("_id title body created")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({
          error: err,
        });
      });
  },
  postByUser: (req, res, next) => {
    Post.find({ user: req.user._id })
      .populate("user", " _id name email")
      .select("_id title body created")
      .sort("_created")
      .exec((err, post) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        res.json(post);
      });
  },
  postById: (req, res, next, id) => {
    Post.findById(id)
      .populate("user", " _id name email")
      .exec((err, post) => {
        if (err || !post) {
          return res.json({
            error: err,
          });
        }
        req.post = post;
        next();
      });
  },
  isPoster: (req, res, next) => {
    // const isPoster = req.post && req.post.user._id == req.user._id;
    // if (!isPoster) {
    //   res.json({
    //     error: "You'r not Authorize",
    //   });
    // }
    // next();
    const postId = req.post._id;
    const userId = req.user._id;
    console.log(req.post.user._id === req.user._id);
    Post.findById(postId)
      .then((post) => {
        if (post.user._id === userId) {
          next();
        }
        return res.json({
          error: "You'r not Authorize",
        });
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  },
  deletePost: (req, res, next) => {
    let post = req.post;
    post.remove((err, post) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      return res.json({
        message: "Post is Deleted",
      });
    });
  },
  postUpdate: (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updated = Date.now();
    post.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  },
};
