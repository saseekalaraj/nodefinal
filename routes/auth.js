const express = require("express");
const { sigup } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, sigup);

module.exports = router;
