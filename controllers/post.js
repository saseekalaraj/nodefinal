const Post = require("../models/Post");
exports.getPosts = (req, res) => {
  Post.find().select("_id title body")
    .then(post => {
      res.status(200).json({ post: post });
    })
    .catch(err => console.log(err));
};

exports.createPosts = (req, res) => {
  const post = new Post(req.body);
  post.save().then(result => {
    res.status(200).json({
      post: result
    });
  });
};
