import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {letras = []} = palabras;
    
    for (const [name, version] of entries(letras)) {
        silabas.push(buscar(name, version));
    }
    
    return await Promise.all(silabas);
};
