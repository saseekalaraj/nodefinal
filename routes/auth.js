const express = require("express");
const { sigup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, sigup);
router.post("/signin", signin);
router.get("/signout", signout);

//app will be first excute id
router.param("userId", userById)
module.exports = router;
