import process from 'node:process';
import {test} from 'supertape';
import {parseArgs} from './parse-args.js';

test('palabra: cli: parseArgs', (t) => {
    const result = parseArgs([]);
    const expected = {
        _: [],
        d: '~/.local/share',
        directorio: '~/.local/share',
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
    
    if (PALABRA_DIR)
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
    
    if (PALABRA_DIR)
        process.env.PALABRA_DIR = PALABRA_DIR;
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: cli: parseArgs: XDG_DATA_HOME', (t) => {
    const {XDG_DATA_HOME, PALABRA_DIR} = process.env;
    
    process.env.XDG_DATA_HOME = '/xxx';
    delete process.env.PALABRA_DIR;
    
    const result = parseArgs(['i', 'nvim']);
    
    const expected = {
        _: ['i', 'nvim'],
        d: '/xxx',
        directorio: '/xxx',
    };
    
    if (XDG_DATA_HOME)
        process.env.XDG_DATA_HOME = XDG_DATA_HOME;
    
    if (PALABRA_DIR)
        process.env.PALABRA_DIR = PALABRA_DIR;
    
    t.deepEqual(result, expected);
    t.end();
});
