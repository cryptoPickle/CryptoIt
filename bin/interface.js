#!/usr/bin/env babel-node

import colors from 'colors';
import figlet from 'figlet';
import program from 'commander';
import path from 'path';
import crypto from '../src/api/crypto';

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
    const status = await crypto.decryptandUncompress(input, output, options.key);
    console.log(status);
  });

program.parse(process.argv);
