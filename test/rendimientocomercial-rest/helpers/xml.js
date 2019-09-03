const xml = require('xmlbuilder');
const fs = require('fs');
var appEnv = require('../environments/environment');

write = async (filename, content) => {
    var result = await generateFromObject(content);
    fs.writeFileSync(appEnv.assets_dir + filename, result);
}

generateFromObject = async (content) => {
    return xml.create(content).end({ pretty: true });
}

exports.write = write;
exports.generateFromObject = generateFromObject;