const fs = require('fs-extra')
const path = require('path');

const args = process.argv.slice(2);

const momentumUiBaseLocation = path.resolve(__dirname, '../../', args[0]);

const momentumScssLocation = path.resolve(momentumUiBaseLocation, 'core/scss')

const reactScssLocation = path.resolve(__dirname, '../scss');

console.log('momentum scss location:', momentumUiBaseLocation)
console.log('new react scss location:', reactScssLocation)


fs.mkdirp(reactScssLocation);
fs.copy(momentumScssLocation, reactScssLocation)

const templatesLocation = path.resolve(momentumUiBaseLocation, 'core/templates')

fs.copy(templatesLocation, path.resolve(__dirname, '../templates'));

const iconsLocation = path.resolve(momentumUiBaseLocation, 'icons');
const newIconsLocation = path.resolve(__dirname, '../../icons');

fs.copy(iconsLocation, newIconsLocation)
