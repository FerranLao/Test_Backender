const express = require("express");
require("dotenv").config();

const app = express();

app.use("/cloudinary", require("./routes/cloudinary"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send(err.message || "Something happened");
});

module.exports = app;
