import { Server } from 'http';
import Express from 'express';
import path from 'path';

const app = new Express();
const server = new Server(app);

app.use(Express.static(path.join(__dirname, 'assets'), { maxAge: 0 }));
app.disable('view cache');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  return res.render('index');
})

app.get('/coba', function (req, res) {
  return res.render('index');
})

// start the server
const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
