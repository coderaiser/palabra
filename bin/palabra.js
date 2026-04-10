#!/usr/bin/env node

import process from 'node:process';
import {readdir} from 'node:fs/promises';
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

if (!instrucciones || instrucciones === 'i') {
    cmd = await instalar(args._, args);
} else if (instrucciones === 'l') {
    const list = await readdir(new URL('../letras', import.meta.url));
    console.log(list);
    process.exit(0);
} else {
    console.error('palabra i [letra1, letra2, ..., letraN]');
    process.exit(1);
}

if (!args.quiet && cmd)
    console.log(`> ${cmd}`);

if (args['dry-run'])
    process.exit(0);

const [error] = await tryToCatch(execa, cmd, {
    shell: '/bin/bash',
    stdio: 'inherit',
});

if (error)
    process.exitCode = error.exitCode;
