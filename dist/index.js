'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = undefined;

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypt = exports.encrypt = _api2.default.encryptAndCompress;
var decrypt = exports.decrypt = _api2.default.decryptandUncompress;
//# sourceMappingURL=index.js.map