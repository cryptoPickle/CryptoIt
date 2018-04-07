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
    let resolvedFilePath = path.resolve(filePath);
    const fileName = this.fileName(filePath);
    let file = await this.readFileAsync(resolvedFilePath, type);
    let newLinesOfFile = file.split('\n');
    console.log(newLinesOfFile[newLinesOfFile.length - 1] !== fileName);
    if (newLinesOfFile[newLinesOfFile.length - 1] !== fileName) {
      console.log('hello');
      await this.appendFileAsync(resolvedFilePath, `\n ${fileName}`);
    }

    //   let datainFile = this.readFile(path, type).split('\n');
    //   let filename = this.fileName(path);
    //   if (datainFile[datainFile.length - 1] !== filename) {
    //     this.appendFile(path, `\n${filename}`);
    //   }
  }
};

export default IOlib;
