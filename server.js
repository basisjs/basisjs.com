require('basisjs-tools').server.command(null, {
  port: process.env.PORT || 8000,
  base: 'site',
  index: 'basisjs',
  sync: false,
  dev: false,
  handler: [
    'html.js'
  ],
  rewrite: {
    'host:jsclub.ru': 'http://basisjs.com [R301]',
    '^/(docs|demo|src|test|tour)(?:/(.*))?$': '/basisjs/$1/$2'
  }
});
