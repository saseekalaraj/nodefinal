const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const { createPostValidator } = require("../validator");

const router = express.Router();
router.get("/", getPosts);
router.post("/", createPostValidator, createPosts);

module.exports = router;
