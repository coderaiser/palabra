import process from 'node:process';
import {test} from 'supertape';
import {parseArgs} from './parse-args.js';

test('palabra: cli: parseArgs', (t) => {
    const result = parseArgs([]);
    const expected = {
        _: [],
        d: '~/.local/src',
        directorio: '~/.local/src',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: cli: parseArgs: PALABRA_DIR', (t) => {
    const {PALABRA_DIR} = process.env;
    
    process.env.PALABRA_DIR = '/abc';
    const result = parseArgs(['i', 'nvim']);
    
    const expected = {
        _: ['i', 'nvim'],
        d: '/abc',
        directorio: '/abc',
    };
    
    process.env.PALABRA_DIR = PALABRA_DIR;
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: cli: parseArgs: PALABRA_DIR + -d', (t) => {
    const {PALABRA_DIR} = process.env;
    
    process.env.PALABRA_DIR = '/abc';
    const result = parseArgs([
        'i',
        'nvim',
        '-d',
        '/x',
    ]);
    
    const expected = {
        _: ['i', 'nvim'],
        d: '/x',
        directorio: '/x',
    };
    
    process.env.PALABRA_DIR = PALABRA_DIR;
    
    t.deepEqual(result, expected);
    t.end();
});
