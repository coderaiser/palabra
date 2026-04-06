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
    }]);
    
    const expected = [
        'wget https://flatassembler.net/fasm-2.0.0.tgz',
        'tar zxf fasm-2.0.0.tgz',
        'rm fasm-2.0.0.tgz',
        'mkdir -p ~/.local/src',
        'rm -rf ~/.local/src/fasm',
        'mv -f fasm ~/.local/src/fasm',
        'ln -fs ~/.local/src/fasm/./fasm/fasm.x64 ~/.local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
