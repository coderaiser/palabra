import {test} from 'supertape';
import {hablar} from './hablar.js';

test('palabras: hablar: no encontro', (t) => {
    const result = hablar([{
        name: 'fasm',
        version: '2.0.0',
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: './fasm/fasm.x64',
    }]);
    
    const expected = [
        `echo "🧨 letra 'fasm' not found"`,
        'exit 1',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabras: hablar: encontro', (t) => {
    const directorio = '/usr/local/src';
    const options = {
        directorio,
    };
    
    const silabas = [{
        name: 'fasm',
        version: '2.0.0',
        url: 'https://flatassembler.net/fasm-{{ version }}.tgz',
        bin: 'fasm.x64',
        encontro: true,
        directorio,
    }];
    
    const result = hablar(silabas, options);
    
    const expected = [
        'mkdir -p /usr/local/bin',
        'wget -c https://flatassembler.net/fasm-2.0.0.tgz -O ${XDG_CACHE_HOME:-/tmp}/fasm-2.0.0.tgz',
        'rm -rf /usr/local/src/fasm',
        'mkdir -p /usr/local/src/fasm',
        'tar xf ${XDG_CACHE_HOME:-/tmp}/fasm-2.0.0.tgz -C /usr/local/src',
        'rm ${XDG_CACHE_HOME:-/tmp}/fasm-2.0.0.tgz',
        'ln -fs /usr/local/src/fasm/fasm.x64 /usr/local/bin/fasm',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabras: hablar: no silabas', (t) => {
    const directorio = '/usr/local/src';
    const options = {
        directorio,
    };
    
    const silabas = [];
    const result = hablar(silabas, options);
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
