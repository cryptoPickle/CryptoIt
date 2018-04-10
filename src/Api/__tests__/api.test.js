import encrypt from '../encryption';
import decrypt from '../decryption';
import IO from '../../utilities/IO';
describe('File encryption tests', () => {
  let fileName;
  test('Encrypt file', async () => {
    const result = await encrypt('./testFiles/encryptionTest.txt', './testFiles/', 'mysecret');
    expect(result).toContain('.zip');
    const isExist = await IO.checkFileExistsAsync(`./testFiles/${result}`);
    expect(isExist).toBe(true);
    fileName = result;
  });
  test('Decyrpt file', async () => {
    await decrypt(
      './testFiles/d854bce0-3c37-11e8-9793-c3a986e18a5b.zip',
      './testFiles',
      'mysecret'
    );
  });
});
