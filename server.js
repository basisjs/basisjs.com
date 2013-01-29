var http = require('http');
var bt = require('basisjs-tools');

bt.server.command(null, {
  port: process.env.PORT || 8000,
  ignore: ['.git'],
  base: 'site',
  index: 'basisjs',
  dev: false
});
