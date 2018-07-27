'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _util = require('util');

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _cryptoJs = require('crypto-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cryptLib = {
  encryptData: function encryptData(input, key, output, fileName) {
    return new Promise(function (resolve, reject) {
      var password = new Buffer(key);
      var aes = _crypto2.default.createCipher('aes-256-cbc', password);
      var gzip = _zlib2.default.createGzip();
      var rs = _fs2.default.createReadStream(input);
      var wr = _fs2.default.createWriteStream(output + '/' + fileName);
      rs.pipe(aes).pipe(gzip).pipe(wr).on('finish', function () {
        return resolve('Encrypted');
      }).on('error', reject);
    });
  },
  decryptData: function decryptData(input, key, output, fileName) {
    return new Promise(function (resolve, reject) {
      var password = new Buffer(key);
      var aesDecrypt = _crypto2.default.createDecipher('aes-256-cbc', password);
      var rs = _fs2.default.createReadStream(input);
      var wr = _fs2.default.createWriteStream(output + '/' + fileName);
      var unzip = _zlib2.default.createGunzip();
      rs.pipe(unzip).pipe(aesDecrypt).pipe(wr).on('finish', function () {
        return resolve('Decrypted');
      }).on('error', function (e) {
        return reject(e);
      });
    });
  },
  cryptoFileName: function cryptoFileName(filepath, key) {
    var fileName = _path2.default.basename(filepath);
    return Buffer.from(_cryptoJs.AES.encrypt(fileName, key).toString(), 'ascii').toString('hex');
  },
  decryptFileName: function decryptFileName(hexData, key) {
    return _cryptoJs.AES.decrypt(Buffer.from(hexData, 'hex').toString('ascii'), key).toString(_cryptoJs.enc.Utf8);
  },

  deleteFileAsync: (0, _util.promisify)(_fs2.default.unlink),

  //Following functions are for recursive fileNaming
  iterateFileName: function iterateFileName(file) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var filePath = _path2.default.resolve(file);
    var fileName = _path2.default.basename(file);
    var isFileExists = _fs2.default.existsSync(filePath);
    var pathExculudesFile = this.pathWitoutFile(filePath, fileName);
    if (isFileExists) {
      var extention = _path2.default.extname(fileName);
      if (extention) {
        var newFileName = '' + this.createNewFileName(fileName, extention, num) + extention;
        return this.iterateFileName(pathExculudesFile + '/' + newFileName, num += 1);
      } else {
        var _newFileName = this.createNewFileName(fileName, null, num);
        return this.iterateFileName(pathExculudesFile + '/' + _newFileName, num += 1);
      }
    } else {
      return fileName;
    }
  },


  /// HELPERS
  createNewFileName: function createNewFileName(fileName, extention, num) {
    if (extention) {
      var baseName = fileName.split(extention)[0];
      return this.baseNameWitoutCrypt(baseName) + 'crypted' + (num === 0 ? '' : num);
    } else {
      return this.baseNameWitoutCrypt(fileName) + 'crypted' + (num === 0 ? '' : num);
    }
  },
  baseNameWitoutCrypt: function baseNameWitoutCrypt(file) {
    var regex = /crypted/;
    if (regex.test(file)) return file.split(regex)[0];
    return file;
  },
  pathWitoutFile: function pathWitoutFile(filePath, fileName) {
    return filePath.split('/').filter(function (item) {
      return item !== fileName;
    }).join('/');
  }
};

exports.default = cryptLib;
//# sourceMappingURL=index.js.map