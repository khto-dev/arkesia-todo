const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// View Engine
app.set("view engine", "ejs");

module.exports = app;