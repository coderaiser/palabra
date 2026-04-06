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

test('palabras: escuchar: camino', async (t) => {
    const [result] = await escuchar({
        camino: '/usr/local/src',
        letras: {
            fasm: '2.0.0',
        },
    });
    
    const {camino} = result;
    const expected = '/usr/local/src';
    
    t.equal(camino, expected);
    t.end();
});
