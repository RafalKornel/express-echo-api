var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 3000,
  ip = process.env.IP || "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ip, function () {
  console.log("Echo API is listening on port " + port);
});

var reqData = function (req) {
  debugger;

  const params = ["method", "hostname", "path", "query", "headers", "body"];
  return params.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = req[currentValue];
    return accumulator;
  }, {});
};

app.all("*", function (req, res) {

  console.log(req.params);
  console.log(req.params.dictionary);
  console.log(req.body);
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  var response = reqData(req);

  var stringifiedResponse = JSON.stringify(response, null, 2);
  console.log(stringifiedResponse);

  res.status(200).send(stringifiedResponse);
});

module.exports = app;
