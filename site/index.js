var Value = require('basis.data').Value;
var DataObject = require('basis.data').Object;
var Dataset = require('basis.data').Dataset;
var Node = require('basis.ui').Node;
var Viewer = require('./basisjs/tour/src/slide/viewer/index.js');
var Editor = require('./basisjs/tour/src/slide/viewer/editor/index.js');
var Flow = require('./basisjs/src/devpanel/module/data-flow/index.js');
var buildTree = Flow.createTreeBuilder({
  sandbox: basis
});

function normalizeOffset(text){
    text = text
        // cut first empty lines
        .replace(/^\s*[\n]+/, '')
        .replace(/\s+$/, '');

    // fix empty strings
    text = text.replace(/\n[ \t]+\n/g, '\n\n');

    // normalize text offset
    var minOffset = 1000;
    var lines = text.split(/\n+/);
    var startLine = Number(text.match(/^function/) != null); // fix for function.toString()

    for (var i = startLine; i < lines.length; i++) {
        var m = lines[i].match(/^\s*/);
        if (m[0].length < minOffset) {
            minOffset = m[0].length;
        }
        if (minOffset == 0) {
            break;
        }
    }

    if (minOffset > 0) {
        text = text.replace(new RegExp('(^|\\n) {' + minOffset + '}', 'g'), '$1');
    }

    return text;
}

function sourceToValue(source){
    try {
        var fn = new Function('exports,module,basis,global,__filename,__dirname,resource,require,asset', source);
        var module = {
          exports: {}
        };

        fn(module.exports, module, basis, global, '', '', resource, require, asset);

        return module.exports;
    } catch(e) {
        console.error(e);
    }
}

basis.ready(function() {
    basis.array(document.querySelectorAll('.demo')).forEach(function(demoEl){
        var files = new Dataset({
            items: basis.array(demoEl.getElementsByTagName('script')).map(function(scriptEl){
                var filename = scriptEl.getAttribute('data-filename');
                return new DataObject({
                    data: {
                        filename: filename,
                        content: normalizeOffset(scriptEl.innerHTML),
                        updatable: basis.path.extname(filename) !== '.js'
                    }
                });
            })
        });

        new Viewer({
            container: demoEl,
            mode: 'horizontal',
            data: {
                files: files
            }
        });
    });

    basis.array(document.querySelectorAll('.data-flow')).forEach(function(demoEl){
        new Node({
            container: demoEl,
            template: resource('./template/flow-demo.tmpl'),
            binding: {
                editor: new Editor({
                    data: {
                        filename: 'demo.js',
                        content: normalizeOffset(demoEl.getElementsByTagName('script')[0].innerHTML)
                    }
                }),
                flow: new Flow({
                    init: function(){
                        Flow.prototype.init.call(this);
                        Value
                            .query(this, 'owner.satellite.editor.data.content')
                            .as(sourceToValue)
                            .as(buildTree)
                            .link(this, this.setChildNodes);
                    }
                })
            }
        });
    });
});


