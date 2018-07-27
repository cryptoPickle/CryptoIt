#!/usr/bin/env node
'use strict';

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function header() {
  console.log(_colors2.default.rainbow(_figlet2.default.textSync('Crypto It', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));
}

header();

_commander2.default.command('encrypt <file>').option('-O, --output-destination <output>', 'Output Destionation').option('-K, --key <key>', 'Your Key').option('-E, --encrypt-file-name', 'Encrypt File Name').option('-D, --destroy-orginal', 'Deletes the orginal file').action(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, optional) {
    var input, output, status;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _path2.default.resolve(process.cwd(), file);
            output = _path2.default.resolve(process.cwd(), optional.outputDestination);
            _context.next = 4;
            return _api2.default.encryptAndCompress(input, output, optional.key, optional.destroyOrginal === undefined ? false : true, optional.encryptFileName === undefined ? false : true);

          case 4:
            status = _context.sent;

            if (status === 'Encrypted') {
              console.log('File has been encrypted, go and play safe'.rainbow);
            }

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_commander2.default.command('decrypt <file>').option('-O, --output-destination <output>', 'Output Destionation').option('-K, --key <key>', 'Your Key').action(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, options) {
    var input, output, status;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _path2.default.resolve(process.cwd(), file);
            output = _path2.default.resolve(process.cwd(), options.outputDestination);
            _context2.next = 4;
            return _api2.default.decryptandUncompress(input, output, options.key);

          case 4:
            status = _context2.sent;

            if (status === 'Decrypted') {
              console.log('File has been decrypted, cool yea?'.rainbow);
            }
            if (status === 'File does not exists!') {
              console.log('File does not exists please check'.green);
            }

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

_commander2.default.on('--help', function () {
  console.log('');
  console.log('');
  console.log('  Options for encrypt:'.red);
  console.log('');
  console.log('  Usage:'.yellow);
  console.log('');
  console.log('   cryptoIt encrypt [file] -K [your key] -O [outputDest] [options]'.green);
  console.log('');
  console.log('    -K --key [required]');
  console.log('    -O --output-destination [required]');
  console.log('    -D --destroy-orginal [optional]: destroys orginal file');
  console.log('    -E --dont-encrypt-file-name [optional]: does not encrypt the file name');
  console.log('');
  console.log('');
  console.log('  Options for decrypt:'.red);
  console.log('');
  console.log('  Usage:'.yellow);
  console.log('');
  console.log('   cryptoIt decrypt [file] -K [your key] -O [outputDest] [options]'.green);
  console.log('');

  console.log('    -K --key [required]');
  console.log('    -O --output-destination [required]');

  console.log('');
});

_commander2.default.parse(process.argv);
//# sourceMappingURL=interface.js.map