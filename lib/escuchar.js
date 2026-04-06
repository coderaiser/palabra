import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {
        camino = '~/.local/src',
        letras = [],
    } = palabras;
    
    for (const [name, version] of entries(letras)) {
        silabas.push(buscar(name, {
            version,
            camino,
        }));
    }
    
    return await Promise.all(silabas);
};
