#!/usr/bin/env node

import program from 'commander';
import genDiff from '../.';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>');

program.parse(process.argv);

if (program.args.length < 2) {
  console.log('Error: There are not enough files to compare!');
  process.exit(1);
} else {
  console.log(genDiff(program.args[0], program.args[1]));
}
