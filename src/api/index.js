import crypt from '../lib';
import path from 'path';
import fs from 'fs';

const crypto = {
  async decryptandUncompress(filePath, outputPath, key) {
    try {
      const input = path.resolve(filePath);
      const output = path.resolve(outputPath);
      const re = /[0-9A-Fa-f]{6}/g;
      const fileName = path.basename(input);
      const isHex = re.test(fileName);

      if (fs.existsSync(input)) {
        const status = await crypt.decryptData(
          input,
          key,
          output,
          isHex ? crypt.decryptFileName(fileName, key) : fileName
        );
        await crypt.deleteFileAsync(input);
        return status;
      } else {
        return 'File does not exists!';
      }
    } catch (e) {
      console.log(e);
    }
  },
  async encryptAndCompress(filePath, outputPath, key, destFile = false, keepName = true) {
    try {
      const input = path.resolve(filePath);
      const output = path.resolve(outputPath);
      const fileName = keepName ? crypt.iterateFileName(input) : crypt.cryptoFileName(input, key);
      const status = await crypt.encryptData(input, key, output, fileName);
      if (destFile) {
        await crypt.deleteFileAsync(input);
      }
      return status;
    } catch (e) {
      throw e;
    }
  }
};

export default crypto;
