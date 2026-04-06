import {test} from 'supertape';
import {parse} from './parser.js';

test('palabra: parser', (t) => {
    const result = parse({
        name: 'fasm',
        version: '1.73.32',
        link: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: 'fasm.x64',
        camino: '~/.local/src',
    });
    
    const expected = [
        'wget https://flatassembler.net/fasm-1.73.32.tgz',
        'tar zxf fasm-1.73.32.tgz',
        'rm fasm-1.73.32.tgz',
        'mkdir -p ~/.local/src',
        'rm -rf ~/.local/src/fasm',
        'mv -f fasm ~/.local/src/fasm',
        'ln -fs ~/.local/src/fasm/fasm.x64 ~/.local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh', (t) => {
    const result = parse({
        name: 'deno',
        link: 'https://deno.land/install.sh',
        bin: 'bin/deno',
        camino: '~/.local/src',
    });
    
    const expected = [
        'curl -fsSL https://deno.land/install.sh | sh',
        'ln -fs ~/.local/src/deno/bin/deno ~/.local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh: env', (t) => {
    const result = parse({
        name: 'deno',
        link: 'https://deno.land/install.sh',
        bin: 'bin/deno',
        camino: '~/.local/src',
        env: {
            DENO_DIR: './.local/src',
        },
    });
    
    const expected = [
        'DENO_DIR=./.local/src curl -fsSL https://deno.land/install.sh | sh',
        'ln -fs ~/.local/src/deno/bin/deno ~/.local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
