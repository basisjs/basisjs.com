
var fs = require('fs');
var path = require('path');
var script = fs.readFileSync('./google-analytics.script', 'utf-8');

exports.process = function(mime, data, fn, fres){
  if (mime == 'text/html')
  {
    data = String(data).replace(/<\/body>/i, script + '</body>');

    //if (fres.rewritten)
    //  data = data.replace(/<head>/i, '<head><base href="' + path.dirname(path.normalize(fn)) + '/">');

    return data;
  }
};