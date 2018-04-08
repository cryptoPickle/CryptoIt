# Crypto-It

## Description

A library can encrypt and decrypt any file.

## Usage

## CLI

```
Usage: commandLine.js <command> [options]

Commands:
  commandLine.js encrypt        encrypt the file
  commandLine.js decrypt        decrypt the file
  commandLine.js encrypt-multi  encrypt multiple file in same format and key
  commandLine.js decrypt-multi  decrypt multiple file in same format and key

Options:
  --version            Show version number                           [boolean]
  -f, --file           Load a file                                  [required]
  -k, --key            enter the key                                [required]
  -c, --chipper        provide the chipper                          [required]
  --lsc, --ls-chipper  show chipper list
  -h, --help           Show help                                     [boolean]

Examples:
  cryptoIt encrypt  -f foo.txt -k [your key] -c aes || ==> encrypt files
  with given key
```

### Dependencies
