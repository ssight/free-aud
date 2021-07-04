// ES-FIX: A hacky but working solution to fix `exports` not being defined in node

const fs = require('fs');
const path = require('path');

let dynamicPatches = fs.readdirSync("patches/dynamic");

dynamicPatches.forEach(i => {
    let patch = fs.readFileSync(path.resolve("patches/dynamic", i)).toString();
    patch = patch.replace("exports.default = ", "module.exports = ");
    fs.writeFileSync(path.resolve("patches/dynamic", i), patch);
})

let util = fs.readFileSync("patches/util.js").toString();
util = util.replace("exports.getSrcFiles = void 0;", "").replace("\nexports.getSrcFiles = ", "module.exports.getSrcFiles = ");
fs.writeFileSync("patches/util.js", util);