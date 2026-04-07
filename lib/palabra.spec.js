import {test} from 'supertape';
import {create} from './palabra.js';

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
