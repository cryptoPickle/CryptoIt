import IO from '../utilities/IO';
import fs from 'fs';

describe('Crypto Tests', () => {
  test('Read text format', () => {
    IO.readFileAsync('.babelrc', 'utf8').then((item) => {
      expect(item.lenght > 0).toBe(true);
    });
  });
  test('Read an img file in hex', () => {
    let re = /[0-9A-Fa-f]{6}/g;
    IO.readFileAsync('./testFiles/test.png', 'hex').then((item) =>
      expect(re.test(item)).toBe(true)
    );
  });
  test('Write file', () => {
    IO.writeFileAsync('./hello', 'Hello world').then(() => {
      IO.readFileAsync('./hello').then((item) => {
        expect(item).toEqual('Hello world');
      });
      expect(fs.existsSync('.hello')).toBe(true);
    });
  });
  test('Get file name', () => {
    expect(IO.fileName('hello')).toEqual('hello');
  });
  test('Delete the file', () => {
    IO.deleteFile('hello').then(() =>
      expect(fs.existsSync('hello')).toBe(false)
    );
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
