const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use(bodyParser.urlencoded({extended: false}));

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ "time": req.time });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", function(req, res) {
  process.env.MESSAGE_STYLE === "uppercase" 
  ? res.json({"message": "HELLO JSON"})
  : res.json({"message": "Hello json"})
});
app.get("/:word/echo", (req, res) => {
  res.json({ "echo": req.params.word })
});
app.route("/name")
   .get((req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` })
  })
  .post((req, res) => {
  const string = req.body.first + " " + req.body.last;
  res.json({ name: string });
  });

module.exports = app;
