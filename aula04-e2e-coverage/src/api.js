const http = require('http');
const { once } = require('events');

const user = {
  username: 'Edson',
  password: '123'
}
const routes = {
  '/contact:get': (req, res) => {
    res.writeHead(200);
    res.end('contact us page!');
  },
  //  curl -i -X POST localhost:3000/login -d '{"username":"edson","password":"123"}'
  '/login:post': async (req, res) => {
    const { username, password } = JSON.parse(await once(req, 'data'));
    const toLower = (text) => text.toLowerCase();
    if (
      toLower(username) === toLower(user.username) &&
      password === user.password
    ) {
      res.writeHead(200);
      res.end('Login Successful!');
      return;
    }
    res.writeHead(401);
    res.end('Login Failed!');
  },
  default: (req, res) => {
    res.writeHead(404);
    res.end('not found');
  }
}

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  console.log
  const chosenRoute = routes[routeKey] || routes.default;
  return chosenRoute(request, response);
}

const portApplication = 3000;
const app = http.createServer(handler).listen(portApplication, () => console.log(`Running application on port ${portApplication}`));

module.exports = app;

