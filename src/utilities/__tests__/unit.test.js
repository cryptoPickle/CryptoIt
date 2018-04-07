import IO from '../IO';
import fs from 'fs';

describe('File System', () => {
  test('Read text format', async () => {
    let item = await IO.readFileAsync('./testFiles/testFile', 'utf8');
    expect(item.split(' ').length > 0).toBe(true);
  });

  test('Read an img file in hex', () => {
    let re = /[0-9A-Fa-f]{6}/g;
    IO.readFileAsync('./testFiles/test.png', 'hex').then((item) =>
      expect(re.test(item)).toBe(true)
    );
  });

  test('Write file', async () => {
    await IO.writeFileAsync('./testFiles/dontTrustAnyone', 'DNT even Elmo');
    const item = await IO.readFileAsync('./testFiles/dontTrustAnyone', 'utf8');
    expect(item).toEqual('DNT even Elmo');
  });

  test('Get file name', () => {
    expect(IO.fileName('hello')).toEqual('hello');
  });

  test('Delete the file', async () => {
    await IO.deleteFileAsync('./testFiles/dontTrustAnyone');
    expect(fs.existsSync('hello')).toBe(false);
  });

  test('Generate uuid', () => {
    expect(IO.generateUUID().length > 5).toBe(true);
  });

  test('Write filename in document', async () => {
    const regex = /{-{-{(.*?)}-}-}/;
    await IO.writeFileAsync('./testFiles/test', 'hello world');
    await IO.writeFileNameInDocument('./testFiles/test', 'utf8');
    const item = await IO.readFileAsync('./testFiles/test', 'utf8');
    expect(regex.test(item)).toBe(true);
  });

  test('Do not write file name in document if exist', async () => {
    const regex = /{{{(.*?)}}}/;
    await IO.writeFileNameInDocument('./testFiles/test', 'utf8');
    const item = await IO.readFileAsync('./testFiles/test', 'utf8');
    expect(regex.test(item)).toBe(false);
    await IO.deleteFileAsync('./testFiles/test');
  });
});
