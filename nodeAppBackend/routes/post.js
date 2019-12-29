const express = require("express");
const {
  getPosts,
  createPosts,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
} = require("../controllers/post");
const { createPostValidator } = require("../validator");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();
router.get("/post", getPosts);
router.post("/post/:userId", requireSignin, createPosts, createPostValidator);
router.get("/post/:userId", requireSignin, postsByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
//app will be first excute userId
router.param("userId", userById);
//app will be first excute postId
router.param("postId", postById);
module.exports = router;
