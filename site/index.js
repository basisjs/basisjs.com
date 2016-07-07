var DataObject = require('basis.data').Object;
var Dataset = require('basis.data').Dataset;
var Viewer = require('./basisjs/tour/src/slide/viewer/index.js');

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
});
