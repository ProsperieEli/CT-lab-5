const SimpleDb = require('./simple-db');
const parseBody = require('./parse-body');

const db = new SimpleDb('{$__dirname}/../__tests__/techShop');

const techRouter = {
  async post(req, res) {
    const tech = await parseBody(req);
    await db.save(tech);
    const savedTech = await db.get(tech.id);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedTech));
  },

  async get(req, res)  {
    const [, , id] = req.url.split('/');

    if (id) {
      const tech = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(tech));
    } else {
      const techs = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(techs));
    }
  },

  async delete(req, res) {
    const [, , id] = req.url.split('/');

    const tech = await db.delete(id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tech));

  },

  async put(req, res) {
      
  }
};
