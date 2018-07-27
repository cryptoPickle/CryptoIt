'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var crypto = {
  decryptandUncompress: function decryptandUncompress(filePath, outputPath, key) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var input, output, re, fileName, isHex, status;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              input = _path2.default.resolve(filePath);
              output = _path2.default.resolve(outputPath);
              re = /[0-9A-Fa-f]{6}/g;
              fileName = _path2.default.basename(input);
              isHex = re.test(fileName);

              if (!_fs2.default.existsSync(input)) {
                _context.next = 15;
                break;
              }

              _context.next = 9;
              return _lib2.default.decryptData(input, key, output, isHex ? _lib2.default.decryptFileName(fileName, key) : fileName);

            case 9:
              status = _context.sent;
              _context.next = 12;
              return _lib2.default.deleteFileAsync(input);

            case 12:
              return _context.abrupt('return', status);

            case 15:
              return _context.abrupt('return', 'File does not exists!');

            case 16:
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 18]]);
    }))();
  },
  encryptAndCompress: function encryptAndCompress(filePath, outputPath, key) {
    var _this2 = this;

    var destFile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var keepName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var input, output, fileName, status;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              input = _path2.default.resolve(filePath);
              output = _path2.default.resolve(outputPath);
              fileName = keepName ? _lib2.default.iterateFileName(input) : _lib2.default.cryptoFileName(input, key);
              _context2.next = 6;
              return _lib2.default.encryptData(input, key, output, fileName);

            case 6:
              status = _context2.sent;

              if (!destFile) {
                _context2.next = 10;
                break;
              }

              _context2.next = 10;
              return _lib2.default.deleteFileAsync(input);

            case 10:
              return _context2.abrupt('return', status);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](0);
              throw _context2.t0;

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 13]]);
    }))();
  }
};

exports.default = crypto;
//# sourceMappingURL=index.js.map