import {test} from 'supertape';
import {create, createPalabra} from './palabra.js';

test('palabra: create', async (t) => {
    const result = await create({
        letras: {
            bun: '*',
            deno: '*',
        },
    });
    
    t.match(result, ' && ');
    t.end();
});

test('palabra: createPalabra', async (t) => {
    const result = await createPalabra(['bun', 'deno'], {
        directorio: '/usr/local/src',
    });
    
    const expected = {
        directorio: '/usr/local/src',
        letras: {
            bun: '*',
            deno: '*',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});
