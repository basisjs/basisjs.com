var DataObject = require('basis.data').Object;
var Dataset = require('basis.data').Dataset;
var Viewer = require('./basisjs/tour/src/slide/viewer/index.js');

basis.ready(function() {
    new Viewer({
        container: document.getElementById('demo1'),
        data: {
            files: new Dataset({
                items: [
                    new DataObject({
                        data: {
                            filename: 'app.js',
                            content: 'var Node = require(\'basis.ui\').Node;\n\nnew Node({\n  container: document.body,\n  template: \'<h1>hello world!</h1>\'\n});'
                        }
                    })
                ]
            })
        }
    });
});
