import {escuchar} from './escuchar.js';
import {hablar} from './hablar.js';

const isString = (a) => typeof a === 'string';

export const create = async (palabras) => {
    const silabas = await escuchar(palabras);
    const commands = hablar(silabas);
    
    return commands.join(' && ');
};

export const createPalabra = (nombres, letras) => {
    if (letras)
        return {
            letras,
        };
    
    if (isString(nombres))
        return {
            letras: {
                [nombres]: '*',
            },
        };
    
    const newLetras = {};
    
    for (const nombre of nombres) {
        newLetras[nombre] = '*';
    }
    
    return {
        letras: newLetras,
    };
};

