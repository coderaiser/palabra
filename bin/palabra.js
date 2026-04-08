#!/usr/bin/env node

import process from 'node:process';
import {execa} from 'execa';
import {tryToCatch} from 'try-to-catch';
import {parseArgs} from '../lib/parse-args.js';
import {instalar} from '../lib/cli/instalar.js';

const argv = process.argv.slice(2);
const args = parseArgs(argv);

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

