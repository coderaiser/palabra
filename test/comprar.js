import process from 'node:process';
import {readFixtures} from './fixture.js';
import {escuchar} from '../lib/escuchar.js';
import {hablar} from '../lib/hablar.js';
import {createPalabra} from '../lib/palabra.js';

const {stringify} = JSON;

const {UPDATE} = process.env;

export const createComprar = (dir) => ({equal}) => {
    const fixture = readFixtures(dir);
    
    return async (name, letraParte) => {
        const palabra = createPalabra(name, letraParte);
        const [silaba] = await escuchar(palabra);
        
        const commands = hablar([silaba]);
        const result = stringify(commands, null, 4);
        
        if (UPDATE)
            fixture[name] = result;
        
        return equal(result, fixture[name]);
    };
};

