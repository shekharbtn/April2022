const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./contollers/userController/router");
const blogRouter = require("./contollers/blogController/router");

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

module.exports = app;
