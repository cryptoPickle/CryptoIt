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
        .on('finish', () => resolve('Hello thereeeeee this is crypted file talking'))
        .on('error', reject);
    });
  },
  decryptData(input, key, output) {
    return new Promise((resolve, reject) => {
      const password = new Buffer(key);
      const aesDecrypt = crypto.createDecipher('aes-256-cbc', password);
      const rs = fs.createReadStream(input);
      const wr = fs.createWriteStream(output);
      const unzip = zlib.createGunzip();
      rs
        .pipe(unzip)
        .pipe(aesDecrypt)
        .pipe(wr)
        .on('finish', () => resolve('file has been decrypted'))
        .on('error', () => reject);
    });
  },
  cryptoFileName(filepath, key) {
    const fileName = path.basename(filepath);
    return Buffer.from(AES.encrypt(fileName, key).toString(), 'ascii').toString('hex');
  },
  decryptFileName(hexData, key) {
    return AES.decrypt(Buffer.from(hexData, 'hex').toString('ascii'), key).toString(enc.Utf8);
  },
  deleteFileAsync: promisify(fs.unlink)
};

export default cryptLib;
