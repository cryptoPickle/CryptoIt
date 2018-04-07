# Crypto-It

## Description

A library can encrypt and decrypt any file.

## Usage

## CLI

```
Usage: cryptoIt <command> [options]

Commands:
  cryptoIt encrypt        encrypt the file
  cryptoIt decrypt        decrypt the file
  cryptoIt encrypt-multi  encrypt multiple file in same format and key
  cryptoIt decrypt-multi  decrypt multiple file in same format and key

Options:
  --version            Show version number                           [boolean]
  -f, --file           Load a file                                  [required]
  -k, --key            enter the key                                [required]
  -c, --chipper        provide the chipper                          [required]
  --lsc, --ls-chipper  show chipper list
  -h, --help           Show help                                     [boolean]

Examples:
  cryptoIt encrypt  -f foo.txt -k    encrypt files with given key
  key -c aes
```

### Dependencies
