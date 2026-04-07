import process from 'node:process';
import {readFixtures} from './fixture.js';
import {escuchar} from '../lib/escuchar.js';
import {hablar} from '../lib/hablar.js';

const {stringify} = JSON;

const {UPDATE} = process.env;
const createLetra = (name, letras) => {
    if (letras)
        return {
            letras,
        };
    
    return {
        letras: {
            [name]: '*',
        },
    };
};

export const createComprar = (dir) => ({equal}) => {
    const fixture = readFixtures(dir);
    
    return async (name, letraParte) => {
        const letra = createLetra(name, letraParte);
        const [silaba] = await escuchar(letra);
        
        const commands = hablar([silaba]);
        const result = stringify(commands, null, 4);
        
        if (UPDATE)
            fixture[name] = result;
        
        return equal(result, fixture[name]);
    };
};

