import IO from '../IO';
import fs from 'fs';

describe('File System', () => {
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
    IO.writeFileAsync('./testFiles/hello', 'Hello world').then(() => {
      IO.readFileAsync('./testFiles/hello', 'utf8')
        .then((content) => {
          expect(content).toEqual('Hello world');
        })
        .catch((e) => console.log(e));
    });
    expect(fs.existsSync('.hello')).toBe(true);
  });
  test('Get file name', () => {
    expect(IO.fileName('hello')).toEqual('hello');
  });
  test('Delete the file', async () => {
    await IO.deleteFileAsync('./testFiles/hello');
    expect(fs.existsSync('hello')).toBe(false);
  });
  test('Generate uuid', () => {
    expect(IO.generateUUID().length > 5).toBe(true);
  });
  test('Write filename in document', async () => {
    await IO.writeFileNameInDocument('./testFiles/test', 'utf8');
  });
});
