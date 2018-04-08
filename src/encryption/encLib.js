import { enc } from 'crypto-js';
import AES from 'crypto-js/aes';
import MD5 from 'crypto-js/md5';
import SHA256 from 'crypto-js/sha256';
import SHA1 from 'crypto-js/sha1';
import SHA512 from 'crypto-js/sha512';

const encLib = {
  cryptAES(data, key) {
    return AES.encrypt(data, key).toString();
  },
  decryptAES(data, key) {
    return AES.decrypt(data, key).toString(enc.Utf8);
  }
};

export default encLib;
