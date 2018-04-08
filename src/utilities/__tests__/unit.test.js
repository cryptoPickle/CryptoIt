import IO from '../IO';
import fs from 'fs';
import path from 'path';
import { sleep } from '../delay';


describe('File System', () => {
  test('Read text format', async () => {
    let item = await IO.readFileAsync(
      './testFiles/anotherBoringTestFile',
      'utf8'
    );
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
    const regex = /{-{-{(.*?)}-}-}/;
    let checkFile = await IO.writeFileNameInDocument(
      './testFiles/test',
      'utf8'
    );
    const item = await IO.readFileAsync('./testFiles/test', 'utf8');
    expect(checkFile).toBe(false);
    expect(regex.test(item)).toBe(true);
    await IO.deleteFileAsync('./testFiles/test');
  });

  test('Compress the data', async () => {
    const compressedFile = await IO.compressFiles(
      './testFiles/testFile',
      './testFiles'
    );
    expect(
      fs.existsSync(`${path.resolve('./testFiles')}/${compressedFile}`)
    ).toBe(true);
    await IO.deleteFileAsync(`./testFiles/${compressedFile}`);
  });

  test('Decompress the data', async () => {
    let fileExist;
    let decompress = IO.decompressFiles(
      './testFiles',
      '9a640590-3b32-11e8-a2b2-a1d443475a3d.zip',
      './testFiles'
    ).then(() => {
      fileExist = IO.checkFileExistsAsync(
        './testFiles/9a640590-3b32-11e8-a2b2-a1d443475a3d'
      );
      expect(fileExist).toBe(true);
    });


    await IO.deleteFileAsync(
      './testFiles/9a640590-3b32-11e8-a2b2-a1d443475a3d'
    );
  });
});
