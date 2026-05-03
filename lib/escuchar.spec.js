import {test} from 'supertape';
import {escuchar} from './escuchar.js';

test('palabras: escuchar', async (t) => {
    const [, result] = await escuchar({
        letras: {
            fasm: '2.0.0',
        },
    });
    
    const {encontro} = result[0];
    
    t.ok(encontro);
    t.end();
});

test('palabras: escuchar: directorio', async (t) => {
    const [, result] = await escuchar({
        directorio: '/usr/local/src',
        letras: {
            fasm: '2.0.0',
        },
    });
    
    const {directorio} = result[0];
    const expected = '/usr/local/src';
    
    t.equal(directorio, expected);
    t.end();
});

test('palabras: escuchar: dependencies', async (t) => {
    const [, result] = await escuchar({
        directorio: '/usr/local/src',
        letras: {
            node: '*',
        },
    });
    
    t.equal(result.length, 2);
    t.end();
});

test('palabras: escuchar: dependencies: duplicates', async (t) => {
    const [, result] = await escuchar({
        directorio: '/usr/local/src',
        letras: {
            nvm: '*',
            node: '*',
        },
    });
    
    t.equal(result.length, 2);
    t.end();
});

test('palabras: escuchar: dependencies: order', async (t) => {
    const [, result] = await escuchar({
        directorio: '/usr/local/src',
        letras: {
            nvchad: '*',
            nvim: '*',
        },
    });
    
    const getName = ({name}) => name;
    const names = result.map(getName);
    
    const expected = [
        'nvim',
        'nvchad',
    ];
    
    t.deepEqual(names, expected);
    t.end();
});
