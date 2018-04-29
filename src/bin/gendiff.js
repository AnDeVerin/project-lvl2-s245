#!/usr/bin/env node

import program from 'commander';
import genDiff from '../.';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format)));

program.parse(process.argv);

if (!program.args.length) program.help();

