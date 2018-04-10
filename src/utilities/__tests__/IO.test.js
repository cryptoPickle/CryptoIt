import IO from '../IO';
import fs from 'fs';
import path from 'path';

describe('File System', () => {
  test('Read text format', async () => {
    let item = await IO.readFileAsync('./testFiles/anotherBoringTestFile', 'utf8');
    expect(item.split(' ').length > 0).toBe(true);
  });

  test('Read an img file in hex', () => {
    let re = /[0-9A-Fa-f]{6}/g;
    IO.readFileAsync('./testFiles/readTest', 'hex').then((item) =>
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
    let checkFile = await IO.writeFileNameInDocument('./testFiles/test', 'utf8');
    const item = await IO.readFileAsync('./testFiles/test', 'utf8');
    expect(checkFile).toBe(false);
    expect(regex.test(item)).toBe(true);
    await IO.deleteFileAsync('./testFiles/test');
  });

  test('Compress the data', async () => {
    let input = path.resolve('./testFiles/readTest');
    let output = path.resolve('./testFiles');
    const fileName = await IO.compressFiles(input, output);
    expect(fs.existsSync(`${output}/${fileName}.zip`)).toBe(true);
    await IO.deleteFileAsync(`${output}/${fileName}.zip`);
  });
  test('Decompress the data', async () => {
    let status = await IO.decompressFiles(
      './testFiles/fd04a130-3d05-11e8-baeb-2d62b10a780e.zip',
      './testFiles'
    );
    expect(status).toBe('Unzipped');
  });
  test('Convert file to orginal', async () => {
    try {
      let status = await IO.convertToOriginalFile(
        '48656c6c6f205468657265',
        './testFiles',
        'hello.txt'
      );
      expect(status).toBe('Data has been decrypted, go play with something else!');
      await IO.deleteFileAsync('./testFiles/hello.txt');
    } catch (e) {
      console.log(e);
    }
  });
  test('Get file name inside regex', () => {
    const testString = 'My files name is {-{-{butters.txt}-}-}';
    expect(IO.getFileName(testString)).toEqual('butters.txt');
  });
  test('Get only hex data', () => {
    const hexAndString = 'e01f010a{-{-{hello.txt}-}-}02244a';
    expect(IO.getOnlyHexData(hexAndString)).toEqual('e01f010a02244a');
  });
  test('Create one upper path', () => {
    const testPath = '/this/is/a/test/path/dtao.zip';
    expect(IO.createOneUpperPath(testPath)).toEqual('/this/is/a/test/path/');
  });
});
