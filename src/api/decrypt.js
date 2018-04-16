// eslint disable no-console
import crypt from '../lib';
import path from 'path';

async function decryptFile(filePath, outputPath, key) {
  try {
    const input = path.resolve(filePath);
    const output = path.resolve(outputPath);
    const re = /[0-9A-Fa-f]{6}/g;
    const fileName = path.basename(input);
    const isHex = re.test(fileName);

    if (isHex) {
      return await crypt.decryptData(input, key, output, crypt.decryptFileName(fileName, key));
    } else {
      return await crypt.decryptData(input, key, output, fileName);
    }
  } catch (e) {
    console.log(e);
  }
}

export default decryptFile;
