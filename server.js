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
    '^/(docs|demo|src|test)(/.*)?$': '/basisjs/$1/$2'
  }
});
