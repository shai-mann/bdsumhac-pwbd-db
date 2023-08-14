var express = require("express");
var db = require("./src/database");
var app = express();
var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use(function (req, res) {
  res.status(404);
});

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});
