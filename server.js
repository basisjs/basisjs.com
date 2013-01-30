require('basisjs-tools').server.command(null, {
  port: process.env.PORT || 8000,
  ignore: ['.git'],
  base: 'site',
  index: 'basisjs',
  sync: false,
  dev: false,
  handler: [
    'html.js'
  ],
  rewrite: {
    '^/docs(.*)': '/basisjs/docs/$1',
    '^/demo/(.*)': '/basisjs/demo/$1',
    '^/src/(.*)': '/basisjs/src/$1',      
    '^/test/(.*)': '/basisjs/test/$1'      
  }
});
