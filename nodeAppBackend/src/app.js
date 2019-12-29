const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
dotenv.config();
//Access Port
const PORT = process.env.PORT || 8080;

//db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connected");
  });
//db connection Error handling
mongoose.connection.on("error", err => {
  console.log(`DB Connection Error:${err.message}`);
});
//bring routes
const postRoute = require("../routes/post");
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
//apiDocs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

const myOwnMiddleware = (req, res, next) => {
  console.log("Middleware Applied");
  next();
};
//middleware
app.use(morgan("dev"));
app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use(postRoute);
app.use(authRoute);
app.use(userRoute);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ error: "Unauthorized token..." });
  }
});

app.listen(PORT, err => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server Listening on: http://localhost:${PORT}`);
});
