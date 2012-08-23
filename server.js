var http = require('http');
var bt = require('basis-devtools');

bt.server.launch({
  port: process.env.PORT || 8000,
  base: process.cwd(),
  ignore: ['.git', 'basis/.git']
});

/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Heroku!\n');
}).listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0');

console.log('Server running at http://' + [process.env.PORT || 8080, process.env.HOST || '0.0.0.0'].reverse().join(':') + '/');*/