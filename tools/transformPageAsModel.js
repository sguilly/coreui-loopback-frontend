var modelName = process.argv[2];

var modelPath = './src/app/views/' + modelName
var outputPath = './templates'


var fs = require('fs');
var files = fs.readdirSync(modelPath);

console.log('files=', files)

var mkdirp = require('mkdirp');
var replace = require('stream-replace');

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

mkdirp(outputPath, function(err) {
    if (err) console.error(err)
    else {
        for (var index = 0; index < files.length; index++) {
            var outputName = files[index].replace(modelName, 'template')

            fs.createReadStream(modelPath + '/' + files[index])
                .pipe(replace(new RegExp(modelName, 'g'), '{|name|}'))
                .pipe(replace(new RegExp(modelName.capitalizeFirstLetter(), 'g'), '{|' + 'name'.capitalizeFirstLetter() + '|}'))
                .pipe(fs.createWriteStream(outputPath + '/' + outputName + '.mustache'));
        }
    }
});