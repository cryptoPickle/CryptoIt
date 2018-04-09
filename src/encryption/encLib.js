import { enc } from 'crypto-js';
import AES from 'crypto-js/aes';
import SHA256 from 'crypto-js/sha256';

const encLib = {
  cryptAES(data, key) {
    return AES.encrypt(data, key).toString();
  },
  decryptAES(data, key) {
    return AES.decrypt(data, key).toString(enc.Utf8);
  },
  cryptKeySHA256(key) {
    return SHA256(key).toString();
  },
  compareKeys(enteredKey, key) {
    return this.cryptKeySHA256(enteredKey) === key;
  }
};

export default encLib;
