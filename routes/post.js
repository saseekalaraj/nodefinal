const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const { createPostValidator } = require("../validator");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");



const router = express.Router();
router.get("/", requireSignin, getPosts);
router.post("/", createPostValidator, createPosts);

//app will be first excute id
router.param("userId", userById)
module.exports = router;
