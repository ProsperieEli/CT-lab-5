const app = require('./lib/app.js');
const http = require('http');

const PORT = process.env.PORT || 7890;

const server = http.createServer(app);

server.listen(PORT, () => {

});

