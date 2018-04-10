import IO from '../utilities/IO';
import crypt from '../encryption/encLib';

async function decrypt(filePath, outputPath, key) {
  try {
    const fileName = await IO.decompressFiles(filePath, outputPath);
    console.log(fileName);

    const newPath = IO.createOneUpperPath(filePath);
    const data = await IO.readFileAsync(`${newPath}/4cacc20-3c5a-11e8-bf8c-23a6bc65c1b7`);
    const decryptedData = crypt.decryptAES(data, key);
    console.log('ss');
    const hexData = IO.getOnlyHexData(decryptedData);
    const orginalFileName = IO.getFileName(decryptedData);
    const status = await IO.convertToOriginalFile(hexData, outputPath, orginalFileName);
    return status;
  } catch (e) {
    console.log(e);
  }
}

decrypt(
  '../../testFiles/54cacc20-3c5a-11e8-bf8c-23a6bc65c1b7.zip',
  '../../testFiles',
  'mysecret'
).then((item) => console.log(item));

export default decrypt;
