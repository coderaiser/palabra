import {test} from 'supertape';
import {parse} from './parser.js';

test('palabra: parser', (t) => {
    const result = parse({
        name: 'fasm',
        version: '1.73.32',
        link: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: './fasm/fasm.x64',
    });
    
    const expected = [
        'wget https://flatassembler.net/fasm-1.73.32.tgz',
        'tar zxf fasm-1.73.32.tgz',
        'rm fasm-1.73.32.tgz',
        'mkdir -p ~/.local/src',
        'rm -rf ~/.local/src/fasm',
        'mv -f fasm ~/.local/src/fasm',
        'ln -fs ~/.local/src/fasm/./fasm/fasm.x64 ~/.local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
