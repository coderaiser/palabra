import {test} from 'supertape';
import {hablar} from './hablar.js';

test('palabras: hablar: no encontro', (t) => {
    const result = hablar([{
        name: 'fasm',
        version: '2.0.0',
        link: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: './fasm/fasm.x64',
    }]);
    
    const expected = [`echo "🧨letra 'fasm' not found"`];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabras: hablar: encontro', (t) => {
    const result = hablar([{
        name: 'fasm',
        version: '2.0.0',
        link: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: './fasm/fasm.x64',
        encontro: true,
        camino: '/usr/local/src',
    }]);
    
    const expected = [
        'wget https://flatassembler.net/fasm-2.0.0.tgz',
        'tar zxf fasm-2.0.0.tgz',
        'rm fasm-2.0.0.tgz',
        'mkdir -p /usr/local/src',
        'rm -rf /usr/local/src/fasm',
        'mv -f fasm /usr/local/src/fasm',
        'ln -fs /usr/local/src/fasm/./fasm/fasm.x64 /usr/local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
