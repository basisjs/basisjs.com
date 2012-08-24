var http = require('http');
var bt = require('basis-devtools');

bt.server.command(null, {
  port: process.env.PORT || 8000,
  ignore: ['.git', 'basis/.git'],
  base: 'site'
});
/*bt.server.launch({
  port: process.env.PORT || 8000,
  base: process.cwd(),
  ignore: ['.git', 'basis/.git'],
  sync1: false
});
*/