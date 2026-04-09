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

test('palabra: createPalabra: version', async (t) => {
    const result = await createPalabra(['bun@1.0.0', 'deno@2.0.0'], {
        directorio: '/usr/local/src',
    });
    
    const expected = {
        directorio: '/usr/local/src',
        letras: {
            bun: '1.0.0',
            deno: '2.0.0',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});
