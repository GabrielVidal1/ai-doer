import { Command } from 'commander';
import { printProcessedLines, processText } from './business/processor';

const packageJson = require('../package.json');
const version: string = packageJson.version;

const program = new Command();

program
  .version(version)
  .name('my-command')
  .option('-d, --debug', 'enables verbose logging', false)
  .parse(process.argv);

program
  .command('parse <command>')
  .description('parse a command')
  .option('-n, --no-functions', 'do not execute functions', false)
  .action(async (command, options) => {
    const res = await processText(command, options.noFunctions);
    console.log(res);
    printProcessedLines(res);
  });

program.parse(process.argv);

// Function code for CLI goes here
