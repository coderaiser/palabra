import {escuchar} from './escuchar.js';
import {hablar} from './hablar.js';

const isString = (a) => typeof a === 'string';

export const create = async (palabras) => {
    const [directorio, silabas] = await escuchar(palabras);
    const commands = hablar(silabas, {
        directorio,
    });
    
    return commands.join(' && ');
};

export const createPalabra = (nombres, {letras, directorio}) => {
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
    
    for (const nombreDificil of nombres) {
        const [nombre, version] = parseNombre(nombreDificil);
        newLetras[nombre] = version;
    }
    
    return {
        directorio,
        letras: newLetras,
    };
};

function parseNombre(nombreDificil) {
    const [nombre, version = '*'] = nombreDificil.split('@');
    
    return [nombre, version];
}
