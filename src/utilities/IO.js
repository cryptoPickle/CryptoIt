import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v1';
import { promisify } from 'util';

const IOlib = {
  writeFileAsync: promisify(fs.writeFile),
  readFileAsync: promisify(fs.readFileSync),
  deleteFile: promisify(fs.unlink),
  fileName(file) {
    return path.basename(path.resolve(file));
  },
  generateUUID() {
    return uuid();
  },
  appendFile(path, data) {
    return fs.appendFileSync(path, data);
  },
  writeFileNameInDocument(path, type) {
    let datainFile = this.readFile(path, type).split('\n');
    let filename = this.fileName(path);
    if (datainFile[datainFile.length - 1] !== filename) {
      this.appendFile(path, `\n${filename}`);
    }
  }
};

export default IOlib;
