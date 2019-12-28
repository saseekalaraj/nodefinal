const Post = require("../models/Post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
exports.getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then(post => {
      res.status(200).json({ post: post });
    })
    .catch(err => console.log(err));
};

exports.createPosts = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
      //console.log("err", req.profile);
    });
  });
};

exports.postsByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(posts);
    });
};

exports.postById = (req, res, next, id) => {
  Post.findById(id).populate("postedBy", "_id name").exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: err
      });
    }
    req.post = post;
    next();
  });
};

exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

  if (!isPoster) {
    return res.status(403).json({
      error: "User is not authorized"
    });
  }
  next();
};

exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save(err => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(post);
  });
};

exports.deletePost = (req, res) => {
  const post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: "Post deleted Successfully"
    });
  });
};
