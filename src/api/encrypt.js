import crypt from '../lib';
import path from 'path';
import uuid from 'uuid';

async function encryptAndCompress(filePath, outputPath, key, destFile = false, keepName = true) {
  try {
    const id = uuid();
    const input = path.resolve(filePath);
    const output = path.resolve(outputPath);
    const fileName = keepName
      ? `${path.basename(input)}-crypted-${id}`
      : crypt.cryptoFileName(input, key);
    const status = await crypt.encryptData(input, key, output, fileName);
    if (destFile) {
      await crypt.deleteFileAsync(input);
    }
    return status;
  } catch (e) {
    throw e;
  }
}

export default encryptAndCompress;
