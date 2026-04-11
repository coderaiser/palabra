import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {
        directorio = '~/.local/src',
        letras = [],
    } = palabras;
    
    for (const [name, version] of entries(letras)) {
        silabas.push(buscar(name, {
            version,
            directorio,
        }));
    }
    
    return [directorio, await Promise.all(silabas)];
};
