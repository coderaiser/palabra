import {test} from 'supertape';
import {escuchar} from './escuchar.js';

test('palabras: escuchar', async (t) => {
    const [result] = await escuchar({
        letras: {
            fasm: '2.0.0',
        },
    });
    
    const {encontro} = result;
    
    t.ok(encontro);
    t.end();
});

test('palabras: escuchar: directorio', async (t) => {
    const [result] = await escuchar({
        directorio: '/usr/local/src',
        letras: {
            fasm: '2.0.0',
        },
    });
    
    const {directorio} = result;
    const expected = '/usr/local/src';
    
    t.equal(directorio, expected);
    t.end();
});
