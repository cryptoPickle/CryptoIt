import yargs from 'yargs';

function commandLine(){
  yargs
    .usage('Usage: $0 <command> [options]')
    .command('encrypt', 'encrypt the file')
    .command('decrypt', 'decrypt the file')
    .command('encrypt-multi', 'encrypt multiple file in same format and key')
    .command('decrypt-multi', 'decrypt multiple file in same format and key')
    .alias('f', 'file')
    .describe('f', 'Load a file')
    .alias('k', 'key')
    .describe('k', 'enter the key')
    .alias('c', 'chipper')
    .describe('c', 'provide the chipper')
    .alias('lsc', 'ls-chipper')
    .describe('lsc', 'show chipper list')
    .demandOption(['f','k','c'])
    .example(
      '$0 encrypt  -f foo.txt -k key -c aes',
      'encrypt files with given key'
    )
    .help('h')
    .alias('h', 'help').argv;
  return yargs;
}


export default commandLine;
