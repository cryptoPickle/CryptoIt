import IO from '../utilities/IO';
import fs from 'fs';

describe('Crypto Tests', () => {
  test('Read text format', () => {
    expect(IO.readFile('.babelrc', 'utf8').length > 0).toBe(true);
  });
  test('Read an img file in hex', () => {
    let re = /[0-9A-Fa-f]{6}/g;
    expect(re.test(IO.readFile('./testFiles/test.png', 'hex'))).toBe(true);
  });
  test('Write file', () => {
    IO.writeFile('./hello', 'Hello world');
    setTimeout(() => expect(fs.existsSync('hello')).toBe(true), 2000);
  });
  test('Get file name', () => {
    expect(IO.fileName('hello')).toEqual('hello');
  });
  test('Delete the file', () => {
    IO.deleteFile('hello');
    setTimeout(() => expect(fs.existsSync('hello')).toBe(false), 2000);
  });
  test('Generate uuid', () => {
    expect(IO.generateUUID().length > 5).toBe(true);
  });
  test('Write filename in document', () => {
    IO.writeFile('./testFiles/writeNameInDoc', '.babelrc');
    IO.writeFileNameInDocument('./testFiles/writeNameInDoc', 'utf8');
    let file = IO.readFile('./testFiles/writeNameInDoc', 'utf8').split('\n');
    expect(file[file.length - 1]).toEqual('writeNameInDoc');
  });
});
