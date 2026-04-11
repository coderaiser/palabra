import {test} from 'supertape';
import {hablar} from './hablar.js';

test('palabras: hablar: no encontro', (t) => {
    const result = hablar([{
        name: 'fasm',
        version: '2.0.0',
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
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
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: 'fasm.x64',
        encontro: true,
        directorio: '/usr/local/src',
    }]);
    
    const expected = [
        'wget -c -nc https://flatassembler.net/fasm-2.0.0.tgz -O /tmp/fasm-2.0.0.tgz',
        'rm -rf /usr/local/src/fasm',
        'mkdir -p /usr/local/src/fasm',
        'tar xf /tmp/fasm-2.0.0.tgz -C /usr/local/src',
        'rm /tmp/fasm-2.0.0.tgz',
        'mkdir -p /usr/local/bin',
        'ln -fs /usr/local/src/fasm/fasm.x64 /usr/local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
