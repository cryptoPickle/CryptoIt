import IO from '../utilities/IO';
import crypt from '../encryption/encLib';
async function encrypt(filePath, outputPath, key) {
  try {
    const hexData = await IO.readFileAsync(filePath, 'hex');

    await IO.writeFileAsync(filePath, hexData);

    await IO.writeFileNameInDocument(filePath);

    const dataContainsName = await IO.readFileAsync(filePath, 'utf8');
    const encryptedData = crypt.cryptAES(dataContainsName, key);
    await IO.writeFileAsync(filePath, encryptedData);
    const encryptedFile = await IO.compressFiles(filePath, outputPath);
    await IO.deleteFileAsync(filePath);
    console.log(encryptedFile);
    // return encryptedFile;
  } catch (e) {
    console.log(e);
  }
}

encrypt('../../testFiles/encryptionTest.txt', '../../testFiles/', 'mysecret');

export default encrypt;
