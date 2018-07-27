#!/usr/bin/env node

import colors from 'colors';
import figlet from 'figlet';
import program from 'commander';
import path from 'path';
import crypto from '../api';

function header() {
  console.log(
    colors.rainbow(
      figlet.textSync('Crypto It', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
}

header();

program
  .command('encrypt <file>')
  .option('-O, --output-destination <output>', 'Output Destionation')
  .option('-K, --key <key>', 'Your Key')
  .option('-E, --encrypt-file-name', 'Encrypt File Name')
  .option('-D, --destroy-orginal', 'Deletes the orginal file')
  .action(async (file, optional) => {
    const input = path.resolve(process.cwd(), file);
    const output = path.resolve(process.cwd(), optional.outputDestination);
    const status = await crypto.encryptAndCompress(
      input,
      output,
      optional.key,
      optional.destroyOrginal === undefined ? false : true,
      optional.encryptFileName === undefined ? false : true
    );
    if (status === 'Encrypted') {
      console.log('File has been encrypted, go and play safe'.rainbow);
    }
  });

program
  .command('decrypt <file>')
  .option('-O, --output-destination <output>', 'Output Destionation')
  .option('-K, --key <key>', 'Your Key')
  .action(async (file, options) => {
    const input = path.resolve(process.cwd(), file);
    const output = path.resolve(process.cwd(), options.outputDestination);
    const status = await crypto.decryptandUncompress(
      input,
      output,
      options.key
    );
    if (status === 'Decrypted') {
      console.log('File has been decrypted, cool yea?'.rainbow);
    }
    if (status === 'File does not exists!') {
      console.log('File does not exists please check'.green);
    }
  });

program.on('--help', function() {
  console.log('');
  console.log('');
  console.log('  Options for encrypt:'.red);
  console.log('');
  console.log('  Usage:'.yellow);
  console.log('');
  console.log(
    '   cryptoIt encrypt [file] -K [your key] -O [outputDest] [options]'.green
  );
  console.log('');
  console.log('    -K --key [required]');
  console.log('    -O --output-destination [required]');
  console.log('    -D --destroy-orginal [optional]: destroys orginal file');
  console.log(
    '    -E --dont-encrypt-file-name [optional]: does not encrypt the file name'
  );
  console.log('');
  console.log('');
  console.log('  Options for decrypt:'.red);
  console.log('');
  console.log('  Usage:'.yellow);
  console.log('');
  console.log(
    '   cryptoIt decrypt [file] -K [your key] -O [outputDest] [options]'.green
  );
  console.log('');

  console.log('    -K --key [required]');
  console.log('    -O --output-destination [required]');

  console.log('');
});

program.parse(process.argv);
