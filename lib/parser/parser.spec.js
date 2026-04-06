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
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

