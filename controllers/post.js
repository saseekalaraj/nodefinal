const Post = require("../models/Post");
const formidable = require("formidable");
const fs = require("fs");
exports.getPosts = (req, res) => {
  Post.find()
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
