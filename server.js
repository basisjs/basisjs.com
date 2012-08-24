var http = require('http');
var bt = require('basis-devtools');

bt.server.command(null, {
  port: process.env.PORT || 8000,
  ignore: ['.git'],
  base: 'site'
});
