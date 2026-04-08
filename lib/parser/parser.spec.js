import {test} from 'supertape';
import {parse} from './parser.js';

test('palabra: parser', (t) => {
    const result = parse({
        name: 'fasm',
        version: '1.73.32',
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: 'fasm.x64',
        directorio: '~/.local/src',
    });
    
    const expected = [
        'wget https://flatassembler.net/fasm-1.73.32.tgz',
        'rm -rf ~/.local/src/fasm',
        'mkdir -p ~/.local/src/fasm',
        'tar zxf fasm-1.73.32.tgz -C ~/.local/src/fasm',
        'rm fasm-1.73.32.tgz',
        'mkdir -p ~/.local/bin',
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
        directorio: '~/.local/src',
    });
    
    const expected = [
        'bash -c "$(curl -fsSL https://deno.land/install.sh)"',
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/deno/bin/deno ~/.local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh: env', (t) => {
    const result = parse({
        name: 'deno',
        url: 'https://deno.land/install.sh',
        directorio: '/usr/local/src',
        env: {
            DENO_DIR: '{{ directorio }}/deno',
        },
    });
    
    const expected = [
        'DENO_DIR=/usr/local/src/deno bash -c "$(curl -fsSL https://deno.land/install.sh)"',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/deno/bin/deno /usr/local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: sh: no ext', (t) => {
    const result = parse({
        name: 'bun',
        url: 'https://bun.sh/install',
        directorio: '~/.local/src',
        env: {
            BUN_INSTALL: '{{ directorio }}/bun',
        },
    });
    
    const expected = [
        'BUN_INSTALL=~/.local/src/bun bash -c "$(curl -fsSL https://bun.sh/install)"',
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/bun/bin/bun ~/.local/bin/bun',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: couple bin', (t) => {
    const result = parse({
        name: 'go',
        version: '1.21.2',
        directorio: '~/.local/src',
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
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/bin/go ~/.local/bin/go',
        'ln -fs ~/.local/src/bin/gofmt ~/.local/bin/gofmt',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: no confirmar', (t) => {
    const result = parse({
        name: 'rust',
        url: 'https://sh.rustup.rs',
        confirmar: false,
        directorio: '/usr/local/src',
        env: {
            RUSTUP_HOME: '{{ directorio }}/rustup',
            CARGO_HOME: '{{ directorio }}/cargo',
        },
    });
    
    const expected = [
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo bash -c "$(curl -fsSL https://sh.rustup.rs)" -- -y',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/rust/bin/rust /usr/local/bin/rust',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
