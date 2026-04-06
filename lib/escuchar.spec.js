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
