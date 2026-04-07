import {test} from 'supertape';
import {parse} from './parser.js';

test('palabra: parser', (t) => {
    const result = parse({
        name: 'fasm',
        version: '1.73.32',
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: 'fasm.x64',
        camino: '~/.local/src',
    });
    
    const expected = [
        'wget https://flatassembler.net/fasm-1.73.32.tgz',
        'rm -rf ~/.local/src/fasm',
        'mkdir -p ~/.local/src/fasm',
        'tar zxf fasm-1.73.32.tgz -C ~/.local/src/fasm',
        'rm fasm-1.73.32.tgz',
        'ln -fs ~/.local/src/fasm/fasm.x64 ~/.local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh', (t) => {
    const result = parse({
        name: 'deno',
        url: 'https://deno.land/install.sh',
        bin: 'bin/deno',
        camino: '~/.local/src',
    });
    
    const expected = [
        'bash -c "$(curl -fsSL https://deno.land/install.sh)"',
        'ln -fs ~/.local/src/deno/bin/deno ~/.local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh: env', (t) => {
    const result = parse({
        name: 'deno',
        url: 'https://deno.land/install.sh',
        camino: '~/.local/src',
        env: {
            DENO_DIR: './.local/src',
        },
    });
    
    const expected = [
        'DENO_DIR=./.local/src bash -c "$(curl -fsSL https://deno.land/install.sh)"',
        'ln -fs ~/.local/src/deno/bin/deno ~/.local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh: no ext', (t) => {
    const result = parse({
        name: 'bun',
        url: 'https://bun.sh/install',
        camino: '~/.local/src',
        env: {
            BUN_INSTALL: './.local/src',
        },
    });
    
    const expected = [
        'BUN_INSTALL=./.local/src bash -c "$(curl -fsSL https://bun.sh/install)"',
        'ln -fs ~/.local/src/bun/bin/bun ~/.local/bin/bun',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: couple bin', (t) => {
    const result = parse({
        name: 'go',
        version: '1.21.2',
        camino: '~/.local/src',
        bin: {
            go: 'bin/go',
            gofmt: 'bin/gofmt',
        },
        url: 'https://go.dev/dl/go{{ version }}.linux-amd64.tar.gz',
    });
    
    const expected = [
        'wget https://go.dev/dl/go1.21.2.linux-amd64.tar.gz',
        'rm -rf ~/.local/src/go',
        'mkdir -p ~/.local/src/go',
        'tar zxf go1.21.2.linux-amd64.tar.gz -C ~/.local/src/go',
        'rm go1.21.2.linux-amd64.tar.gz',
        'ln -fs ~/.local/src/bin/go ~/.local/bin/go',
        'ln -fs ~/.local/src/bin/gofmt ~/.local/bin/gofmt',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
