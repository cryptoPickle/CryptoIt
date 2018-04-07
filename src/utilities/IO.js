import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v1';
import { promisify } from 'util';

const IOlib = {
  writeFileAsync(filePath, data) {
    const asyncWrite = promisify(fs.writeFile);
    return asyncWrite(path.resolve(filePath), data);
  },
  readFileAsync(filePath, type) {
    const readFile = promisify(fs.readFile);
    return readFile(path.resolve(filePath), type);
  },
  deleteFileAsync(filePath) {
    const deleteFile = promisify(fs.unlink);
    return deleteFile(path.resolve(filePath));
  },
  appendFileAsync(filePath, data) {
    const appendFile = promisify(fs.appendFile);
    return appendFile(path.resolve(filePath), data);
  },
  fileName(file) {
    return path.basename(path.resolve(file));
  },
  generateUUID() {
    return uuid();
  },
  async writeFileNameInDocument(filePath, type) {
    const regex = /{-{-{(.*?)}-}-}/;
    const resolvedFilePath = path.resolve(filePath);
    const fileName = this.fileName(filePath);
    let readFile = await this.readFileAsync(resolvedFilePath, type);
    if (!regex.test(readFile)) {
      await this.appendFileAsync(resolvedFilePath, `\n {-{-{${fileName}}-}-}`);
    }
  }
};

export default IOlib;
