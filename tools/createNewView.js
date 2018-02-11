var modelName = process.argv[2];

String.prototype.replaceLast = function(what, replacement) {
    var pcs = this.split(what);
    var lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
};

console.log('Generate files for ', modelName)

var templatePath = './templates'
var outputPath = './tmp/' + modelName

var fs = require('fs');
var mustache = require('mustache')
mustache.tags = ['{|', '|}'];

var mkdirp = require('mkdirp')

var parameters = {}

parameters.Name = modelName.charAt(0).toUpperCase() + modelName.slice(1)
parameters.name = modelName

console.log('parameters', parameters)

var files = fs.readdirSync(templatePath);

mkdirp(outputPath, function(err) {
    if (err) console.error(err)
    else {
        for (var index = 0; index < files.length; index++) {

            var content = fs.readFileSync(templatePath + '/' + files[index], "utf8")

            if (files[index].startsWith('templates.')) {
                var outputName = files[index].replace('templates', parameters.name + 's').replace('.mustache', '')
            } else {
                var outputName = files[index].replace('template', parameters.name).replace('.mustache', '')
            }

            console.log('outputName=' + outputName)

            var output = mustache.render(content, parameters);

            fs.writeFileSync(outputPath + '/' + outputName, output, "utf8")

        }
    }
});