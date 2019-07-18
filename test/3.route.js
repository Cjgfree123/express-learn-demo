const express = require("../lib/express");
const app = express();

app.route("/user")
  .get(function (req, res) {
    res.end("get");
  })
  .post(function (req, res) {
    res.end("post");
  })
  .put(function (req, res) {
    res.end("put");
  })
  .delete(function (req, res) {
    res.end("del");
  });

app.listen(3000);