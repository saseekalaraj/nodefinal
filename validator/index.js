exports.createPostValidator = (req, res, next) => {
  //title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "title Must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150
  });
  //body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "body Must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000
  });
  //check for errors
  const errors = req.validationErrors();
  //show error
  if (errors) {
    const firstError = errors.map(err => err.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null
  req.check("name", "Name is requied").notEmpty();
  //email is not null
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
  //check for password
  req.check("password", "Password is requied").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 charecters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  //check error
  const errors = req.validationErrors();
  //show error
  if (errors) {
    const firstError = errors.map(err => err.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //proceed to next middleware
  next();
};
