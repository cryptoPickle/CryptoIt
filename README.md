# Crypto-It

## Description

A library that can encrypt and decrypt data and files simply.

## Usage

There is two simple function handles encrypting and decrypting the data
which you are passing. Functions returns an promise.

##### Encryption

encrypt function simply takes file path, output path, key and
2 boolean arguments first one is for destroying the orginal file
second one is keeping the file name and returns the result.

If user does not want to keep the file name same, file name is also will
be encrypted and changed to hex string. Decrypt function automaticaly
decrypts the file name as well.

```
encrypt('filePath', 'outputPath', 'key', false, true)
    .then(result => console.log(result))
```

##### Decryption

decrypt function simple takes an encrypted file and decrypts it. If user
encrypted the file name also, this function automatically determinates it and
decrypts the encrypted file name also.

```
decrypt('yourfilepath', 'outputPath', 'key')
    .then(result => console.log(result))
```

## CLI

```
           _  .-')                 _ (`-.  .-') _                                .-') _
          ( \( -O )               ( (OO  )(  OO) )                              (  OO) )
   .-----. ,------.   ,--.   ,--._.`     \/     '._  .-'),-----.         ,-.-') /     '._
  '  .--./ |   /`. '   \  `.'  /(__...--''|'--...__)( OO'  .-.  '        |  |OO)|'--...__)
  |  |('-. |  /  | | .-')     /  |  /  | |'--.  .--'/   |  | |  |        |  |  \'--.  .--'
 /_) |OO  )|  |_.' |(OO  \   /   |  |_.' |   |  |   \_) |  |\|  |        |  |(_/   |  |
 ||  |`-'| |  .  '.' |   /  /\_  |  .___.'   |  |     \ |  | |  |       ,|  |_.'   |  |
(_'  '--'\ |  |\  \  `-./  /.__) |  |        |  |      `'  '-'  '      (_|  |      |  |
   `-----' `--' '--'   `--'      `--'        `--'        `-----'         `--'      `--'

  Usage: cryptoit [options] [command]

  Options:

    -h, --help                output usage information

  Commands:

    encrypt [options] <file>
    decrypt [options] <file>


  Options for encrypt:

  Usage:

   cryptoit encrypt [file] -K [your key] -O [outputDest] [options]

    -K --key [required]
    -O --output-destination [required]
    -D --destroy-orginal [optional]: destroys orginal file
    -E --dont-encrypt-file-name [optional]: does not encrypt the file name


  Options for decrypt:

  Usage:

   cryptoit decrypt [file] -K [your key] -O [outputDest] [options]

    -K --key [required]
    -O --output-destination [required]
```

You can also use the cli encrypt and decrypt data.

##### Example:

For encryption

`cryptoit encrypt testFile.png -K thisissupersecret -O . -D`

For decryption

`cryptoit decrypt testFile.png -K thisissupersecret -O .`
