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
  test('SHA256 Key Encryption', () => {
    let sha256 = crypt.cryptKeySHA256('Dont trust anyone');
    expect(sha256).not.toBe('Dont trust anyone');
  });
  test('Compare Keys', () => {
    expect(
      crypt.compareKeys(
        'Dont trust anyone',
        '6dde3030827963b05e14fa2563b727aa2dbe0ab307565d733f099693a6ded135'
      )
    ).toBe(true);
  });
});
