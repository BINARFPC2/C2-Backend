const express = require("express");
const app = express();
const router = require("../config/routes");

app.use(router);

module.exports = app;
