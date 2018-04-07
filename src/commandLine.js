import yargs from 'yargs';
import colors from 'colors';
function commandLine() {
  yargs
    .usage('Usage: $0 <command> [options]')
    .command('encrypt'.blue, 'encrypt the file'.magenta)
    .command('decrypt'.blue, 'decrypt the file'.magenta)
    .command(
      'encrypt-multi'.blue,
      'encrypt multiple file in same format and key'.magenta
    )
    .command(
      'decrypt-multi'.blue,
      'decrypt multiple file in same format and key'.magenta
    )
    .alias('f', 'file')
    .describe('f', 'Load a file')
    .alias('k', 'key')
    .describe('k', 'enter the key')
    .alias('c', 'chipper')
    .describe('c', 'provide the chipper')
    .alias('lsc', 'ls-chipper')
    .describe('lsc', 'show chipper list')
    .demandOption(['f', 'k', 'c'])
    .example(
      'cryptoIt encrypt  -f foo.txt -k [your key] -c aes || ==> encrypt files with given key'
        .green
    )
    .help('h')
    .alias('h', 'help').argv;
  return yargs;
}

commandLine();

export default commandLine;
