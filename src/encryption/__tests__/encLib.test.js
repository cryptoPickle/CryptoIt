import crypt from '../encLib';

describe('Crypto Tests', () => {
  test('AES Encryption', () => {
    let aes = crypt.cryptAES('Dont trust anyone', 'thisismysecret');
    expect(aes).not.toEqual('Dont trust anyone');
  });
  test('AES Decryption', () => {
    let decrypt = crypt.decryptAES(
      'U2FsdGVkX1/NFQ9GXFmtLmaJL5qJ1hNzMLHA7GWUTjBu3X2FrDgv8HUxwOTSSZt3',
      'thisismysecret'
    );
    expect(decrypt).toEqual('Dont trust anyone');
  });
});
