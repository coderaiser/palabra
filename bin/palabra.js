#!/usr/bin/env node

import process from 'node:process';
import {execa} from 'execa';
import {tryToCatch} from 'try-to-catch';
import {parseArgs} from '../lib/cli/parse-args.js';
import {instalar} from '../lib/cli/instalar.js';
import info from '../package.json' with {
    type: 'json',
};

const argv = process.argv.slice(2);
const args = parseArgs(argv);

if (args.version) {
    console.log(`v${info.version}`);
    process.exit();
}

const instrucciones = args._.shift();

let cmd = '';

if (!instrucciones || instrucciones === 'i')
    cmd = await instalar(args._);

if (!args.quiet)
    console.log(`> ${cmd}`);

if (args['dry-run'])
    process.exit(0);

const [error] = await tryToCatch(execa, cmd, {
    shell: '/bin/bash',
    stdio: 'inherit',
});

if (error)
    process.exitCode = error.exitCode;

