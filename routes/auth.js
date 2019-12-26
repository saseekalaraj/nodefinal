const express = require("express");
const { sigup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, sigup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
