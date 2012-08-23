var http = require('http');
var bt = require('basis-devtools');

//bt.server.launch({ base: process.cwd(), ignore: ['.git', 'basis/.git'] });

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Heroku!\n');
}).listen(process.env.PORT || 8080, process.env.HOST || '127.0.0.1');

console.log('Server running at http://' + [process.env.PORT || 8080, process.env.HOST || '127.0.0.1'].reverse().join(':') + '/');