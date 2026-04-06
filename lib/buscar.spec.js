import {test} from 'supertape';
import {buscar} from './buscar.js';

test('palabras: buscar', async (t) => {
    const result = await buscar('hello');
    const expected = {
        encontro: false,
        name: 'hello',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('palabras: buscar: encontro', async (t) => {
    const {encontro} = await buscar('fasm');
    
    t.ok(encontro);
    t.end();
});

test('palabras: buscar: version', async (t) => {
    const {version} = await buscar('fasm', {
        version: 1337,
    });
    
    const expected = 1337;
    
    t.equal(version, expected);
    t.end();
});

