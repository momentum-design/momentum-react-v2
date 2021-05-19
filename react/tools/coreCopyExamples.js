/* eslint-disable no-console */
var fs = require('fs-extra');

var copyExamples = function copyExamples(source, destination) {
  fs.readdir(source, function (error, directories) {
    if (error) return console.error(error);
    fs.ensureDirSync(destination);

    var _loop = function _loop() {
      if (_isArray) {
        if (_i >= _iterator.length) return "break";
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) return "break";
        _ref = _i.value;
      }

      var componentDir = _ref;
      var stats = fs.statSync(source + "/" + componentDir);

      if (stats.isDirectory()) {
        fs.readdir(source + "/" + componentDir, function (error, contents) {
          for (var _iterator2 = contents, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var content = _ref2;

            if (content === 'examples') {
              fs.copySync(source + "/" + componentDir + "/examples", destination + "/" + componentDir);
              console.log("Examples copied to " + destination + "/" + componentDir);
            }
          }
        });
      }
    };

    for (var _iterator = directories, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      var _ret = _loop();

      if (_ret === "break") break;
    }
  });
};
/* eslint-enable no-console */


module.exports = copyExamples;