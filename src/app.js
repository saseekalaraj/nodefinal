const express = require("express");
const app = express();
const morgan = require("morgan");
//Access Port
const PORT = 3000;

//bring routes
const postRoute = require("../routes/post");

const myOwnMiddleware = (req, res, next) => {
  console.log("Middleware Applied");
  next();
};
//middleware
app.use(morgan("dev"));
app.use(myOwnMiddleware);
app.use("/", postRoute);

app.listen(PORT, err => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server Listening on: http://localhost:${PORT}`);
});
