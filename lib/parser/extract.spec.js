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
        'wget -c -nc https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/amber-linux-gnu-x86_64.tar.xz -O /tmp/amber-linux-gnu-x86_64.tar.xz',
        'rm -rf ~/.local/src/amber',
        'mkdir -p ~/.local/src/amber',
        'tar xf /tmp/amber-linux-gnu-x86_64.tar.xz -C ~/.local/src',
        'rm /tmp/amber-linux-gnu-x86_64.tar.xz',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
