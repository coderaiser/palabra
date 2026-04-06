#!/usr/bin/env node

import {join} from 'node:path';
import process from 'node:process';
import {execa} from 'execa';
import {tryToCatch} from 'try-to-catch';
import {create} from '../lib/palabra.js';

const [arg] = process.argv.slice(2);
const name = join(process.cwd(), '.palabra.json');

const {default: palabras} = await import(name, {
    with: {
        type: 'json',
    },
});

const cmd = await create(palabras);

if (arg !== '-q')
    console.log(`> ${cmd}`);

const [error] = await tryToCatch(execa, cmd, {
    shell: '/bin/bash',
    stdio: 'inherit',
});

if (error)
    process.exitCode = error.exitCode;
