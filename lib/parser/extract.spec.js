import {test} from 'supertape';
import {extract} from './extract.js';

test('palabra: parser: extract: tar.xz', (t) => {
    const result = extract({
        name: 'amber',
        version: '0.5.1-alpha',
        url: 'https://github.com/amber-lang/amber/releases/download/{{ version }}/amber-linux-gnu-x86_64.tar.xz',
        directorio: '~/.local/src',
    });
    
    const expected = [
        'wget -c https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/amber-linux-gnu-x86_64.tar.xz -O ${XDG_CACHE_HOME:-/tmp}/amber-linux-gnu-x86_64.tar.xz',
        'rm -rf ~/.local/src/amber',
        'mkdir -p ~/.local/src/amber',
        'tar xf ${XDG_CACHE_HOME:-/tmp}/amber-linux-gnu-x86_64.tar.xz -C ~/.local/src',
        'rm ${XDG_CACHE_HOME:-/tmp}/amber-linux-gnu-x86_64.tar.xz',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabra: parser: extract: extractDirectory', (t) => {
    const result = extract({
        name: 'rizin',
        version: '0.8.2',
        url: 'https://github.com/rizinorg/rizin/releases/download/v{{ version }}/rizin-v{{ version }}-static-x86_64.tar.xz',
        extractDirectory: '{{ directorio }}/{{ name }}',
        directorio: '~/.local/src',
    });
    
    const expected = [
        'wget -c https://github.com/rizinorg/rizin/releases/download/v0.8.2/rizin-v0.8.2-static-x86_64.tar.xz -O ${XDG_CACHE_HOME:-/tmp}/rizin-v0.8.2-static-x86_64.tar.xz',
        'rm -rf ~/.local/src/rizin',
        'mkdir -p ~/.local/src/rizin',
        'tar xf ${XDG_CACHE_HOME:-/tmp}/rizin-v0.8.2-static-x86_64.tar.xz -C ~/.local/src/rizin',
        'rm ${XDG_CACHE_HOME:-/tmp}/rizin-v0.8.2-static-x86_64.tar.xz',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
