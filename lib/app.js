const techRouter = require('./tech');

const routes = {
  technology: techRouter,    
};

const app = async (req, res) => {
  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (route) {
    try {
      const handler = route[req.method.toUpperCase()];
      await handler(req, res);
    } catch (error) {
      res.statusCode = 500;
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found here');
  }


};


module.exports = app;
