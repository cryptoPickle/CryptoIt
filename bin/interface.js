#!/usr/bin/env node

import colors from 'colors';
import figlet from 'figlet';
import program from 'commander';
import encrypt from '../src/api/encrypt';
import path from 'path';
import decrypt from '../src/api/decrypt';

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
    const input = path.resolve(__dirname, file);
    const output = path.resolve(__dirname, optional.outputDestination);
    console.log(
      input,
      output,
      optional.key,
      false || optional.destroyOrginal,
      false || optional.encryptFileName
    );
    const status = await encrypt(
      input,
      output,
      optional.key,
      false || optional.destroyOrginal,
      false || optional.encryptFileName
    );
    console.log(status);
  });

program
  .command('decrypt <file>')
  .option('-O, --output-destination <output>', 'Output Destionation')
  .option('-K, --key <key>', 'Your Key')
  .action(async (file, options) => {
    const input = path.resolve(file);
    const output = path.resolve(options.outputDestination);
    const status = await decrypt(input, output, options.key);
    console.log(status);
  });

program.parse(process.argv);
