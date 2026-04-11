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
        'wget -c -nc https://flatassembler.net/fasm-1.73.32.tgz -O /tmp/fasm-1.73.32.tgz',
        'rm -rf ~/.local/src/fasm',
        'mkdir -p ~/.local/src/fasm',
        'tar xf /tmp/fasm-1.73.32.tgz -C ~/.local/src',
        'rm /tmp/fasm-1.73.32.tgz',
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

test('palabra: parser: sh: template', (t) => {
    const result = parse({
        name: 'nvm',
        version: '0.40.4',
        url: 'https://raw.githubusercontent.com/nvm-sh/nvm/v{{ version }}/install.sh',
    });
    
    const expected = [
        'bash -c "$(curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh)"',
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/nvm/bin/nvm ~/.local/bin/nvm',
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
        'wget -c -nc https://go.dev/dl/go1.21.2.linux-amd64.tar.gz -O /tmp/go1.21.2.linux-amd64.tar.gz',
        'rm -rf ~/.local/src/go',
        'mkdir -p ~/.local/src/go',
        'tar xf /tmp/go1.21.2.linux-amd64.tar.gz -C ~/.local/src',
        'rm /tmp/go1.21.2.linux-amd64.tar.gz',
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/go/bin/go ~/.local/bin/go',
        'ln -fs ~/.local/src/go/bin/gofmt ~/.local/bin/gofmt',
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

test('palabra: parser: commands', (t) => {
    const result = parse({
        name: 'rust',
        url: 'https://sh.rustup.rs',
        confirmar: false,
        directorio: '/usr/local/src',
        env: {
            RUSTUP_HOME: '{{ directorio }}/rustup',
            CARGO_HOME: '{{ directorio }}/cargo',
        },
        commands: ['ls', 'whoami'],
    });
    
    const expected = [
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo bash -c "$(curl -fsSL https://sh.rustup.rs)" -- -y',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/rust/bin/rust /usr/local/bin/rust',
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo ls',
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo whoami',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: commands: directorio', (t) => {
    const result = parse({
        name: 'rust',
        url: 'https://sh.rustup.rs',
        confirmar: false,
        directorio: '/usr/local/src',
        env: {
            RUSTUP_HOME: '{{ directorio }}/rustup',
            CARGO_HOME: '{{ directorio }}/cargo',
        },
        commands: ['ls /usr/local/src'],
    });
    
    const expected = [
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo bash -c "$(curl -fsSL https://sh.rustup.rs)" -- -y',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/rust/bin/rust /usr/local/bin/rust',
        'RUSTUP_HOME=/usr/local/src/rustup CARGO_HOME=/usr/local/src/cargo ls /usr/local/src',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: tar.xz', (t) => {
    const result = parse({
        name: 'amber',
        version: '0.5.1-alpha',
        url: 'https://github.com/amber-lang/amber/releases/download/{{ version }}/amber-linux-gnu-x86_64.tar.xz',
        directorio: '/usr/local/src',
    });
    
    const expected = [
        'wget -c -nc https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/amber-linux-gnu-x86_64.tar.xz -O /tmp/amber-linux-gnu-x86_64.tar.xz',
        'rm -rf /usr/local/src/amber',
        'mkdir -p /usr/local/src/amber',
        'tar xf /tmp/amber-linux-gnu-x86_64.tar.xz -C /usr/local/src',
        'rm /tmp/amber-linux-gnu-x86_64.tar.xz',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/amber/bin/amber /usr/local/bin/amber',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: no execute', (t) => {
    const result = parse({
        name: 'deno',
        url: 'https://deno.land/install.sh',
        directorio: '/usr/local/src',
        execute: false,
    });
    
    const expected = [
        'curl -fsSL https://deno.land/install.sh',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/deno/bin/deno /usr/local/bin/deno',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: execute', (t) => {
    const result = parse({
        name: 'haskell',
        url: 'https://get-ghcup.haskell.org',
        env: {
            BOOTSTRAP_HASKELL_NONINTERACTIVE: '1',
        },
    });
    
    const expected = [
        'BOOTSTRAP_HASKELL_NONINTERACTIVE=1 bash -c "$(curl -fsSL https://get-ghcup.haskell.org)"',
        'mkdir -p ~/.local/bin',
        'ln -fs ~/.local/src/haskell/bin/haskell ~/.local/bin/haskell',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
