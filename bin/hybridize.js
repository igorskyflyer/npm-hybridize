#!/usr/bin/env node

const yargs = require('yargs')
const { hybridize } = require('../src/index.js')

const cmd = yargs(process.argv.slice(2))
  .version('1.0.0')
  .alias('v', 'version')
  .usage('Usage: $0 --out <string> --module <"cjs" or "esm"> [--overwrite]')
  .alias('h', 'help')
  .help('help')
  .demandOption(['out', 'module'])
  .option('out', {
    alias: 'o',
    demandOption: true,
    requiresArg: true,
    describe: 'The output directory for the package.json file.',
    type: 'string',
  })
  .option('module', {
    alias: 'm',
    choices: ['cjs', 'esm'],
    demandOption: true,
    requiresArg: true,
    describe: 'The module type to cast the module to.',
    type: 'string',
  })
  .options('overwrite', {
    alias: 'w',
    default: false,
    describe: 'Whether an existing package.json file should be overwritten.',
    type: 'boolean',
  }).argv

// @ts-ignore
hybridize(cmd.out, cmd.module, cmd.overwrite)
