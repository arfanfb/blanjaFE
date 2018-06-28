"use strict";

var _http = require("http");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express.default();
var server = new _http.Server(app);
app.use(_express.default.static(_path.default.join(__dirname, 'assets'), {
  maxAge: 0
}));
app.disable('view cache');
app.set('view engine', 'ejs');
app.set('views', _path.default.join(__dirname, 'views')); // respond with "hello world" when a GET request is made to the homepage

app.get('/', function (req, res) {
  return res.render('index');
});
app.get('/coba', function (req, res) {
  return res.render('index');
}); // start the server

var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'production';
server.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }

  console.info("Server running on http://localhost:".concat(port, " [").concat(env, "]"));
});