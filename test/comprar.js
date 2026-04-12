import process from 'node:process';
import {readFixtures} from './fixture.js';
import {escuchar} from '../lib/escuchar.js';
import {hablar} from '../lib/hablar.js';
import {createPalabra} from '../lib/palabra.js';

const {stringify} = JSON;

const {UPDATE} = process.env;

export const createComprar = (dir) => ({fail, equal}) => {
    const fixture = readFixtures(dir);
    
    return async (name, letras) => {
        const palabra = createPalabra(name, {
            letras,
        });
        
        const [directorio, silabas] = await escuchar(palabra);
        
        const commands = hablar(silabas, {
            directorio,
        });
        
        const result = stringify(commands, null, 4);
        
        if (result.includes('not found'))
            return fail(commands[1]);
        
        if (UPDATE)
            fixture[name] = result;
        
        return equal(result, fixture[name]);
    };
};
