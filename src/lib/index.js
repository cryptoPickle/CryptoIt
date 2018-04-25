import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { promisify } from 'util';
import zlib from 'zlib';
import { AES, enc } from 'crypto-js';

const cryptLib = {
  encryptData(input, key, output, fileName) {
    return new Promise((resolve, reject) => {
      const password = new Buffer(key);
      const aes = crypto.createCipher('aes-256-cbc', password);
      const gzip = zlib.createGzip();
      const rs = fs.createReadStream(input);
      const wr = fs.createWriteStream(`${output}/${fileName}`);
      rs
        .pipe(aes)
        .pipe(gzip)
        .pipe(wr)
        .on('finish', () => resolve('Encrypted'))
        .on('error', reject);
    });
  },
  decryptData(input, key, output, fileName) {
    return new Promise((resolve, reject) => {
      const password = new Buffer(key);
      const aesDecrypt = crypto.createDecipher('aes-256-cbc', password);
      const rs = fs.createReadStream(input);
      const wr = fs.createWriteStream(`${output}/${fileName}`);
      const unzip = zlib.createGunzip();
      rs
        .pipe(unzip)
        .pipe(aesDecrypt)
        .pipe(wr)
        .on('finish', () => resolve('Decrypted'))
        .on('error', (e) => reject(e));
    });
  },
  cryptoFileName(filepath, key) {
    const fileName = path.basename(filepath);
    return Buffer.from(AES.encrypt(fileName, key).toString(), 'ascii').toString('hex');
  },
  decryptFileName(hexData, key) {
    return AES.decrypt(Buffer.from(hexData, 'hex').toString('ascii'), key).toString(enc.Utf8);
  },
  deleteFileAsync: promisify(fs.unlink),

  //Following functions are for recursive fileNaming
  iterateFileName(file, num = 0) {
    const filePath = path.resolve(file);
    const fileName = path.basename(file);
    const isFileExists = fs.existsSync(filePath);
    const pathExculudesFile = this.pathWitoutFile(filePath, fileName);
    if (isFileExists) {
      const extention = path.extname(fileName);
      if (extention) {
        const newFileName = `${this.createNewFileName(fileName, extention, num)}${extention}`;
        return this.iterateFileName(`${pathExculudesFile}/${newFileName}`, (num += 1));
      } else {
        const newFileName = this.createNewFileName(fileName, null, num);
        return this.iterateFileName(`${pathExculudesFile}/${newFileName}`, (num += 1));
      }
    } else {
      return fileName;
    }
  },

  /// HELPERS
  createNewFileName(fileName, extention, num) {
    if (extention) {
      const baseName = fileName.split(extention)[0];
      return `${this.baseNameWitoutCrypt(baseName)}crypted${num === 0 ? '' : num}`;
    } else {
      return `${this.baseNameWitoutCrypt(fileName)}crypted${num === 0 ? '' : num}`;
    }
  },

  baseNameWitoutCrypt(file) {
    const regex = /crypted/;
    if (regex.test(file)) return file.split(regex)[0];
    return file;
  },

  pathWitoutFile(filePath, fileName) {
    return filePath
      .split('/')
      .filter((item) => item !== fileName)
      .join('/');
  }
};

export default cryptLib;
